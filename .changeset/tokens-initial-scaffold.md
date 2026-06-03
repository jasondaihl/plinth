---
"@plinth/tokens": minor
---

Initial scaffold of `@plinth/tokens` — the three-layer design token system.

- **Primitive layer** (`@plinth/tokens/css/primitive`): raw color (blue/gray scales, plus black/white), spacing, radius, shadow, and typography (font families, sizes, weights, line heights) values, emitted as `--plinth-primitive-*` CSS custom properties.
- **Semantic layer** (`@plinth/tokens/css/semantic`): role-based aliases (surface, surface-muted, text, text-muted, border, border-strong, interactive, interactive-hover, …) referencing primitives via `var(--…)`. Ships a parallel dark map emitted under `[data-theme="dark"]`.
- **Brand layer** (`@plinth/tokens/css/brand`): Tailwind v4 `@theme` block surfacing tokens as utility classes (`bg-surface`, `text-text-muted`, `rounded-md`, `p-4`, etc.).
- **TypeScript entrypoint** (`@plinth/tokens`): exports the raw token tree (`primitive`, `semantic`, `semanticDark`, `brand`) and the `ref()` / `isRef()` helpers for tooling.
- Custom `scripts/build.ts` walks the token tree and emits one CSS file per layer; refs become `var(--plinth-…)` lookups so layers compose at runtime.
