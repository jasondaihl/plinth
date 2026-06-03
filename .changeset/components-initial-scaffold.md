---
"@plinth/components": minor
---

Initial scaffold of `@plinth/components` — the React 19 component library.

- Rollup build emits ESM (`dist/index.js`), CJS (`dist/index.cjs`), and bundled type declarations (`dist/index.d.ts`).
- `sideEffects: false` for tree-shaking; React and React-DOM declared as peer dependencies.
- `clsx` runtime dep and `@plinth/tokens` workspace dep ready for first component.
- Vitest + Testing Library + jsdom wired for component tests.

Ships with only a `VERSION` export so far — first real component lands in a follow-up.
