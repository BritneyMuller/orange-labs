# orangelabs.co

The marketing and education site for [Orange Labs](https://orangelabs.co), the community for marketers who build with AI. Built in the open, just like the lab.

The community itself lives at community.orangelabs.co on Circle. This repo powers the root domain only.

## Why this repo is public

Orange Labs teaches marketers to build things. It would be strange to hide how our own site is built. Fork it, study it, steal the patterns — that's the point. If you ship something with it, we'd love to hear about it.

## Architecture (the short version)

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | [Astro](https://astro.build) static output | Pages ship as plain HTML: fast LCP, perfect for SEO and AI crawlers. No server to maintain. |
| Interactivity | React islands | Interactive pieces hydrate individually; everything else stays zero-JS. |
| Styling | Tailwind CSS v4 | Brand tokens live in one `@theme` block in `src/styles/global.css`. |
| Copy | JSON in `src/data/` | Words are editable without touching components. The member count lives in exactly one place. |
| Fonts | Fontsource (self-hosted) | No font CDN requests, no layout shift surprises. |
| Motion | ~40 lines of CSS + one IntersectionObserver | One easing curve, opacity/transform only, respects `prefers-reduced-motion`. |
| Fun | `src/scripts/labgame.js` | An ambient experiment hidden in the footer. Click the flask. Type `ship` if you're in a hurry. |

## Make it yours

1. **Tokens** — swap the palette and fonts in the `@theme` block of `src/styles/global.css`. The whole site reskins.
2. **Words** — edit `src/data/home.json` (homepage copy) and `src/data/site.json` (nav, footer, ticker, facts).
3. **Logos** — replace the files in `public/logos/` and `brand/`.
4. **Deploy** — it's a static build (`npm run build` → `dist/`), so any static host works.

## Development

```sh
npm install
npm run dev      # local preview at localhost:4321
npm run build    # must pass before anything merges
```

Branch per change, PR to `main`. Previews deploy per PR; `main` deploys to production.

## The watermarking simulator (`/watermarking`)

An interactive page explaining how Claude's SynthID-Text watermark works, by running a simplified version of the same mechanism live in the browser.

**What it does:** implements the real algorithm's shape (tournament sampling over candidate words, seeded by a key plus the preceding few words of context, with repeated-context masking) in a deterministic, dependency-free module at `src/lib/watermark.ts`. No `Math.random`, no network calls: the same text and key always produce the same output, which the tests in `src/lib/watermark.test.ts` verify directly.

**What it does not do:** detect real Claude output. It runs on a demo key you can see and edit, against a small hand-built synonym dictionary (`src/data/synonyms.json`) instead of a model's actual vocabulary distribution. Every interactive module says so. It is a teaching tool, not a detector, and it should never be described, linked, or repurposed as one.

**Newsletter signups** on this page go through a dedicated Circle form embed (its own form UID, matching the pattern in `Footer.astro`), not a custom API route. That gives per-page attribution with no admin token anywhere near the client and nothing that can fail silently in production.

## What you won't find here (on purpose)

Open source doesn't mean oversharing. This repo deliberately excludes:

- Member data of any kind — ticker names are fictional until members opt in to being featured
- Secrets, API keys, analytics tokens
- Internal planning documents and business strategy
- Infrastructure details beyond what the code itself requires

If you fork this pattern, we recommend the same discipline: keep the code public and the operations private.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) — written for marketers, not just engineers.

## License

MIT
