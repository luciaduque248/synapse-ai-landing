# SYNAPSE AI

> De conversación a ejecución, sin perder el hilo.

SYNAPSE AI is a fictional B2B SaaS portfolio case study by Sara Duque. The product concept turns meeting audio, transcripts and notes into summaries, decisions, tasks, owners, deadlines and risks without fabricating customers, benchmarks, security certifications or commercial availability.

**Live demo:** https://synapse-ai-landing-nine.vercel.app

## Project goal

Design and build a meeting-intelligence experience that is understandable in seconds and genuinely interactive: bring your own meeting, transcribe it locally, review the text and convert it into an actionable brief.

## Highlights

- Premium responsive SaaS landing and product workspace
- Light and dark mode
- Uploadable text transcripts and meeting audio
- Free in-browser speech-to-text with multilingual Whisper Tiny via Transformers.js
- WebGPU acceleration when supported, with WASM/CPU fallback
- Audio decoding and 16 kHz mono resampling in the browser
- First-run model download with browser caching
- Local note-to-decisions/tasks/risks demo logic
- Lucide icon system across the interface
- Accessible navigation, focus states and reduced-motion support
- SEO metadata for production

## Privacy and cost model

SYNAPSE does not require an OpenAI API key or a paid transcription service. Audio transcription runs in the browser with `onnx-community/whisper-tiny`. The first run downloads model assets from Hugging Face; subsequent runs can reuse the browser cache. Meeting audio is not uploaded to a SYNAPSE transcription endpoint and this demo has no database.

Text-to-brief analysis is still a deterministic portfolio simulation rather than a hosted LLM. The interface labels sample/dashboard data accordingly.

## Stack

- Next.js 16
- React 19
- TypeScript
- Transformers.js
- ONNX Whisper Tiny
- Lucide React
- Tailwind CSS / CSS interaction system

## Portfolio integrity

SYNAPSE AI is not a real company or commercial AI service. No customer logos, growth metrics, testimonials, benchmarks, certifications, security claims, integrations or prices are presented as verified facts.

## Local development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Status

**Meeting Intelligence demo · local browser transcription**
