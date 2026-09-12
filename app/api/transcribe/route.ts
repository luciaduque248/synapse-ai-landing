const MAX_AUDIO_BYTES = 4 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["mp3", "m4a", "wav", "webm", "ogg", "mp4"]);

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "El servicio de transcripción no está configurado todavía." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const incoming = await request.formData();
    const file = incoming.get("file");

    if (!(file instanceof File)) {
      return Response.json(
        { error: "Adjunta un archivo de audio válido." },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }

    if (file.size === 0) {
      return Response.json(
        { error: "El archivo de audio está vacío." },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }

    if (file.size > MAX_AUDIO_BYTES) {
      return Response.json(
        { error: "El audio supera 4 MB. Para esta demo en Vercel usa un clip más corto." },
        { status: 413, headers: { "Cache-Control": "no-store" } },
      );
    }

    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      return Response.json(
        { error: "Formato no compatible. Usa MP3, M4A, WAV, WEBM, OGG o MP4." },
        { status: 415, headers: { "Cache-Control": "no-store" } },
      );
    }

    const payload = new FormData();
    payload.append("file", file, file.name);
    payload.append("model", "gpt-transcribe");
    payload.append("response_format", "json");

    const upstream = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: payload,
      cache: "no-store",
    });

    const data = (await upstream.json()) as { text?: string; error?: { message?: string } };

    if (!upstream.ok) {
      const message = data.error?.message || "El proveedor de transcripción devolvió un error.";
      return Response.json(
        { error: message },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    const text = data.text?.trim();
    if (!text) {
      return Response.json(
        { error: "La transcripción terminó sin texto utilizable." },
        { status: 422, headers: { "Cache-Control": "no-store" } },
      );
    }

    return Response.json(
      { text, model: "gpt-transcribe" },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "No se pudo procesar el audio. Intenta nuevamente." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
