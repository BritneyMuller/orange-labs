# Contributing to orangelabs.co

This site belongs to the Orange Labs community, and you don't need to be an engineer to improve it. Most contributions are words, and words live in easy-to-edit files.

## Fix a typo or improve copy (no coding required)

1. Almost every word on the homepage lives in [`src/data/home.json`](src/data/home.json). Site-wide facts (nav links, footer, ticker, member count) live in [`src/data/site.json`](src/data/site.json).
2. On GitHub, open the file and click the pencil icon to edit it in your browser.
3. Make your change, then choose "Propose changes." That creates a pull request: a suggestion that gets reviewed before it goes live.
4. A preview link of the site with your change will appear on the pull request so you can see it live before it merges.

## Bigger ideas

Open an issue first and describe what you're thinking. That way nobody spends a weekend building something that doesn't fit the roadmap.

## Ground rules

- Match the voice: confident, warm, plain-language, anti-hype (see [docs/brand-guidelines.md](docs/brand-guidelines.md)).
- Never add member names, emails, or any personal data. This repo is public. Ticker entries use fictional names on purpose.
- Never commit secrets, API keys, or internal business documents.
- `npm run build` must pass before anything merges.

## Running it locally (optional)

```sh
npm install
npm run dev    # http://localhost:4321
```

Requires Node 22+.
