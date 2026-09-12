export type LocalTranscriptionProgress = {
  phase: "decoding" | "loading" | "ready" | "transcribing";
  progress?: number;
  backend?: "WebGPU" | "WASM";
  detail?: string;
};

type LocalTranscriber = (
  audio: Float32Array,
  options?: {
    task?: "transcribe";
    chunk_length_s?: number;
    stride_length_s?: number;
  },
) => Promise<{ text?: string } | Array<{ text?: string }>>;

type CachedTranscriber = {
  pipe: LocalTranscriber;
  backend: "WebGPU" | "WASM";
};

type ProgressRecord = {
  status?: string;
  progress?: number;
  file?: string;
};

let cachedTranscriber: Promise<CachedTranscriber> | null = null;

function toProgressRecord(value: unknown): ProgressRecord {
  if (typeof value !== "object" || value === null) return {};
  const record = value as Record<string, unknown>;
  return {
    status: typeof record.status === "string" ? record.status : undefined,
    progress: typeof record.progress === "number" ? record.progress : undefined,
    file: typeof record.file === "string" ? record.file : undefined,
  };
}

function mixToMono(buffer: AudioBuffer) {
  const mono = new Float32Array(buffer.length);
  for (let channelIndex = 0; channelIndex < buffer.numberOfChannels; channelIndex += 1) {
    const channel = buffer.getChannelData(channelIndex);
    for (let index = 0; index < channel.length; index += 1) {
      mono[index] += channel[index] / buffer.numberOfChannels;
    }
  }
  return mono;
}

function resampleLinear(input: Float32Array, fromRate: number, toRate = 16000) {
  if (fromRate === toRate) return input;
  const ratio = fromRate / toRate;
  const outputLength = Math.max(1, Math.round(input.length / ratio));
  const output = new Float32Array(outputLength);

  for (let index = 0; index < outputLength; index += 1) {
    const sourcePosition = index * ratio;
    const leftIndex = Math.floor(sourcePosition);
    const rightIndex = Math.min(leftIndex + 1, input.length - 1);
    const fraction = sourcePosition - leftIndex;
    output[index] = input[leftIndex] * (1 - fraction) + input[rightIndex] * fraction;
  }

  return output;
}

async function decodeAudioFile(file: File, onProgress: (progress: LocalTranscriptionProgress) => void) {
  onProgress({ phase: "decoding", detail: "Decoding audio locally…" });
  const audioContext = new AudioContext();
  try {
    const bytes = await file.arrayBuffer();
    const decoded = await audioContext.decodeAudioData(bytes.slice(0));
    const mono = mixToMono(decoded);
    return resampleLinear(mono, decoded.sampleRate, 16000);
  } finally {
    await audioContext.close().catch(() => undefined);
  }
}

async function createPipeline(
  backend: "WebGPU" | "WASM",
  onProgress: (progress: LocalTranscriptionProgress) => void,
): Promise<CachedTranscriber> {
  const { pipeline } = await import("@huggingface/transformers");
  const device = backend === "WebGPU" ? "webgpu" : "wasm";

  const pipe = await pipeline(
    "automatic-speech-recognition",
    "onnx-community/whisper-tiny",
    {
      device,
      ...(backend === "WASM" ? { dtype: "q8" as const } : {}),
      progress_callback: (value: unknown) => {
        const current = toProgressRecord(value);
        const numericProgress = typeof current.progress === "number"
          ? Math.max(0, Math.min(100, Math.round(current.progress)))
          : undefined;
        onProgress({
          phase: "loading",
          progress: numericProgress,
          backend,
          detail: current.file ? `Preparing ${current.file.split("/").pop() ?? "model"}…` : "Preparing Whisper model…",
        });
      },
    },
  );

  return { pipe: pipe as unknown as LocalTranscriber, backend };
}

async function getTranscriber(onProgress: (progress: LocalTranscriptionProgress) => void) {
  if (cachedTranscriber) {
    const cached = await cachedTranscriber;
    onProgress({ phase: "ready", progress: 100, backend: cached.backend, detail: "Whisper model ready." });
    return cached;
  }

  cachedTranscriber = (async () => {
    const canUseWebGPU = typeof navigator !== "undefined" && "gpu" in navigator;
    if (canUseWebGPU) {
      try {
        return await createPipeline("WebGPU", onProgress);
      } catch {
        onProgress({ phase: "loading", backend: "WASM", detail: "WebGPU unavailable. Falling back to CPU…" });
      }
    }
    return createPipeline("WASM", onProgress);
  })().catch((error) => {
    cachedTranscriber = null;
    throw error;
  });

  const result = await cachedTranscriber;
  onProgress({ phase: "ready", progress: 100, backend: result.backend, detail: "Whisper model ready." });
  return result;
}

export async function transcribeAudioLocally(
  file: File,
  onProgress: (progress: LocalTranscriptionProgress) => void,
) {
  const audio = await decodeAudioFile(file, onProgress);
  const { pipe, backend } = await getTranscriber(onProgress);
  onProgress({ phase: "transcribing", progress: 100, backend, detail: "Transcribing locally…" });

  const result = await pipe(audio, {
    task: "transcribe",
    chunk_length_s: 30,
    stride_length_s: 5,
  });

  const text = Array.isArray(result)
    ? result.map((item) => item.text ?? "").join(" ").trim()
    : (result.text ?? "").trim();

  if (!text) throw new Error("Whisper terminó sin producir texto. Prueba con un audio más claro o más corto.");
  return { text, backend };
}
