---
"@plinth/components": minor
---

Add `<Text>` — the first real Plinth component.

- Polymorphic via `as` (`p` default; `span`/`div`/`h1`–`h6`/`label`/`strong`/`em`).
- Variants: `size` (xs–4xl), `weight` (regular/medium/semibold/bold), `tone` (default/muted/inverse), `leading` (tight/normal/relaxed).
- Renders Tailwind utility classes that resolve through the brand → semantic → primitive token chain — no hard-coded values.
- Consumer `className` merges after variant classes for per-instance overrides.
- Storybook stories cover default, sizes, weights, tones, leading, and polymorphic usage.
