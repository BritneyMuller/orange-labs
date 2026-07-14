# orangelabs.co

The marketing and education site for [Orange Labs](https://orangelabs.co), the community for marketers who build with AI. Built in the open, just like the lab.

The community itself lives at community.orangelabs.co on Circle. This repo powers the root domain only.

## What's here

- **Astro** static site with React islands for interactive pieces
- **Tailwind CSS** with the Orange Labs design tokens (Solar Ember, Iron, Midnight Tide, Sandstone, Silver Haze, Bone White)
- Page copy lives in `src/data/*.json` so non-developers can edit words without touching components
- A signaly-inspired motion system in `src/scripts/motion.js` (pure CSS + one IntersectionObserver, respects reduced motion)
- **Exp.000**: an ambient beaker game hidden in the footer (`src/scripts/labgame.js`). Click the flask. Type `ship` if you're in a hurry.

## Working on the site

```sh
npm install
npm run dev      # local preview at localhost:4321
npm run build    # must pass before anything merges
```

Branch per change, PR to `main`. Previews deploy per PR; `main` deploys to production.

## Editing content

Most words on the homepage live in `src/data/home.json`. Site-wide facts (member count, nav, footer links, ticker entries) live in `src/data/site.json`. The member count lives in exactly one place: `site.json` → `memberCount`.

## License

MIT
