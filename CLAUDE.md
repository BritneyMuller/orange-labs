# Orange Labs Website — orangelabs.co

Open-source marketing + education site for Orange Labs, the community for marketers who build with AI. This repo powers the ROOT domain only. The community lives at community.orangelabs.co on Circle and is NOT part of this codebase.

## Hard rules

- NEVER touch, suggest changing, or generate config affecting the `community.orangelabs.co` DNS record or anything Circle-related. The community must never go down because of this repo.
- This repo is PUBLIC. Never commit secrets, API keys, member data, or private business info.
- All copy edits must preserve Britney's voice: confident, warm, plain-language, anti-hype. No corporate jargon, no "genuinely/honestly", no em-dashes.
- Content must stay editable by non-technical helpers: page copy and structured content live in markdown/content collections, not hardcoded in components.

## Stack

- Astro (static output) + React islands for interactive components
- Tailwind CSS (no Material UI)
- Content: Astro Content Collections (markdown), Keystatic CMS at /admin for non-technical editing
- Hosting: Cloudflare Workers static assets; deploy on push to `main`; preview URLs per PR
- Repo is open source (MIT), with CONTRIBUTING.md written for marketers, not engineers

## Brand system

Colors:
- Solar Ember `#F15722` — signature orange accent. CTAs, highlights. Use sparingly for punch.
- Iron `#2B2E33` — primary dark. Dark-mode canvas + text on light.
- Midnight Tide `#1C3A5E` — deep blue. Depth, secondary backgrounds.
- Sandstone `#E8E2DA` — warm light neutral.
- Silver Haze `#B4B6BA` — dividers, captions, secondary text.
- Bone White `#F9F9F8` — off-white text on dark / light canvas.

Typography: Rajdhani (headers/display, bold + condensed), Poppins (subheads + body).

Aesthetic direction: dark, modern, signaly.co-inspired — Iron/Midnight Tide canvases, Bone White text, Solar Ember pops. Generous whitespace, one focal point per section, restraint with the orange. Should look NOTHING like exitfive.com but get inspo from the architecture there.

## Site structure (phased)

- Phase 1 (v1 launch): Homepage, Community page (sells Circle before linking to it), Pricing. 
- Phase 2: /guide — fully public, chapter-based interactive AI implementation guide (markdown chapters + React widgets, progress tracking, copy-paste prompts). Built to be updated often.
- Phase 3: /projects — community project portfolio. Submissions via web form AND via PR (one markdown file per project, template provided). Nothing publishes without Britney's approval.
- Phase 4: /newsletter — Substack signup embed + latest posts via Substack RSS.

## Key facts for copy

- 375+ members (update this number when Britney says so; it lives in ONE place in content config, never hardcoded in multiple files)
- Tiers: Community $49/mo (7-day risk-free), Accelerator course $1,495 (14-day risk-free), Enterprise AI Training $39,900
- Existing homepage copy inventory is in docs/plan.md — reuse it; it's proven. Rebuild = re-platform + redesign, not a copy rewrite.
- Community CTA: "Join the Community" → community landing page → Circle join flow

## SEO requirements (SEO matters)

- Unique title + meta description per page
- Semantic HTML, real headings hierarchy, fast LCP (target Lighthouse 95+)
- OG images per page, sitemap.xml, robots.txt
- Structured data where it earns it (Organization, Course/FAQ on guide pages)
- Content structured to be AI-citation-friendly: clear headings, direct answers, updated dates on guide chapters

## Workflow

- Branch per feature, PR to `main`, Cloudflare preview URL for review before merge
- Run `npm run build` before declaring anything done; broken builds never get merged
- Keep components small; prefer boring, maintainable solutions
