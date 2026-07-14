# Orange Labs — Brand Guidelines

The visual system behind orangelabs.co. If you're forking this site for your own project, this is the layer to swap: change these tokens and the whole site reskins itself.

## Color palette

| Name | Hex | Role |
| --- | --- | --- |
| Solar Ember | `#F15722` | Signature orange. CTAs, highlights, key callouts. Use sparingly — it hits harder that way. |
| Iron | `#2B2E33` | Primary dark. Canvas in dark layouts; text on light backgrounds. |
| Midnight Tide | `#1C3A5E` | Deep blue. Secondary dark, backgrounds, depth and contrast. |
| Sandstone | `#E8E2DA` | Warm light neutral. Section backgrounds, cards. |
| Silver Haze | `#B4B6BA` | Cool gray. Dividers, captions, secondary text. |
| Bone White | `#F9F9F8` | Off-white. Text on dark; primary canvas in light layouts. |

**Pairings**

- Dark sections: Iron or Midnight Tide canvas, Bone White text, Solar Ember pops.
- Light sections: Sandstone background with a dotted grid-paper texture, Iron text.
- One accent per composition. Generous whitespace. One clear focal point.
- Full-bleed Solar Ember is harsh; for large surfaces use the burnt-ember gradient (`#C24415 → #9E370E`) and save the bright orange for buttons.

## Typography

| Use | Font |
| --- | --- |
| Headers / display | **Rajdhani** — condensed, geometric, bold, uppercase |
| Subheads / body | **Poppins** |
| Lab labels, eyebrows, tickers | System monospace, uppercase, wide letter-spacing |

Fonts are self-hosted via Fontsource (no font CDN requests).

## The lab motif

The experimental energy comes from small recurring details, not decoration everywhere:

- Monospace section labels numbered like experiments (`Exp.01 · The problem`, `Lab.03`)
- Blueprint corner ticks (`+`) on cards
- Dotted grid backgrounds: subtle on dark, grid-paper on cream
- A pulsing status dot for "live" states
- One hidden experiment in the footer (find the flask)

## Motion

One easing curve everywhere: `cubic-bezier(.25, .46, .45, .94)`. Reveals are opacity + transform only (GPU-cheap), staggered ~70-90ms, and everything respects `prefers-reduced-motion`. See `src/styles/global.css` and `src/scripts/motion.js`.

## Voice

Confident, warm, plain-language, anti-hype. Short sentences. Benefits over features, numbers over adjectives. If a word can be removed and the point survives, remove it.
