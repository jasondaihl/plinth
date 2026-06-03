# Plinth

A design system built on solid foundations. Tokens, components, and documentation for building consistent, accessible UI at scale.

Plinth is built in public as a portfolio project. The headline architectural decision is a **three-layer token system** — primitive → semantic → brand — that composes at runtime through CSS custom properties and surfaces to Tailwind v4 as utility classes.

---

## Table of contents

- [Repository layout](#repository-layout)
- [Stack](#stack)
- [The three-layer token system](#the-three-layer-token-system)
- [Getting started](#getting-started)
- [Workspace scripts](#workspace-scripts)
- [Consuming the packages](#consuming-the-packages)
  - [`@plinth/tokens`](#plinthtokens)
  - [`@plinth/components`](#plinthcomponents)
- [Adding a new token](#adding-a-new-token)
- [Releases](#releases)
- [Continuous integration](#continuous-integration)
- [License](#license)

---

## Repository layout

Plinth is a [Turborepo](https://turbo.build/) + [pnpm workspaces](https://pnpm.io/workspaces) monorepo.

```
plinth/
├── apps/
│   └── storybook/          # Storybook 9 (Vite) — the live working surface
├── packages/
│   ├── tokens/             # @plinth/tokens — three-layer design tokens
│   └── components/         # @plinth/components — React 19 component library
├── tooling/
│   ├── eslint-config/      # Shared ESLint flat config
│   └── tsconfig/           # Shared tsconfig presets (base, node, react-lib)
├── .changeset/             # Changesets — versioning + changelog
├── .github/workflows/      # CI pipeline
├── turbo.json              # Turbo task graph
└── pnpm-workspace.yaml
```

Workspaces are wired up in `pnpm-workspace.yaml`, and Turbo orchestrates `build`, `dev`, `lint`, `typecheck`, and `test` across them with proper `^build` dependencies.

## Stack

| Layer            | Choice                                                                   |
| ---------------- | ------------------------------------------------------------------------ |
| Package manager  | pnpm 10 (`packageManager` pinned in `package.json`)                      |
| Build orchestrator | Turborepo 2                                                            |
| Runtime          | Node 22 LTS (`.nvmrc`)                                                   |
| Token authoring  | TypeScript, compiled by a custom `scripts/build.ts` (no Style Dictionary) |
| Component build  | Rollup — ESM + CJS + `.d.ts`                                             |
| UI runtime       | React 19                                                                 |
| Styling          | Tailwind v4 (CSS-first `@theme` config)                                  |
| Docs / preview   | Storybook 9 with the Vite builder                                        |
| Testing          | Vitest                                                                   |
| Linting          | ESLint 9 (flat config) via `@plinth/eslint-config`                       |
| Formatting       | Prettier 3                                                               |
| Releases         | Changesets                                                               |

## The three-layer token system

Plinth tokens are authored in TypeScript and emitted as three separate CSS files, one per layer. Each layer is a strict superset of responsibility above the next, and consumers can opt in at whichever layer they need.

### 1. Primitive — raw values

Hard-coded, brand-agnostic atoms: `--plinth-primitive-color-blue-500`, `--plinth-primitive-space-4`, `--plinth-primitive-radius-md`, and so on. Defined in `packages/tokens/src/primitive/`.

### 2. Semantic — role-based aliases

Aliases that name a *role*, not an appearance: `--plinth-semantic-color-surface`, `--plinth-semantic-color-text-muted`, `--plinth-semantic-color-interactive-hover`. Every value is a `ref()` pointing at a primitive, which the build emits as a `var(--…)` lookup — so changing a primitive cascades to every semantic alias and every Tailwind utility downstream **without a rebuild of consumer styles**.

Light and dark modes ship as two parallel maps (`semantic` and `semanticDark`); the dark map is emitted under `[data-theme="dark"]`.

### 3. Brand — Tailwind utility surface

The brand layer registers tokens with Tailwind v4's `@theme` block, so consumers can write `bg-surface`, `text-text-muted`, `rounded-md`, `p-4`, `shadow-lg`, etc., and resolve through the chain primitive → semantic → utility class.

### `ref()` and runtime composition

References between layers use a tiny helper:

```ts
import { ref } from "@plinth/tokens";

ref("primitive.color.blue.600"); // { $ref: "primitive.color.blue.600" }
```

The build walks the token tree, turning `$ref` values into `var(--plinth-…)` lookups. The result: layers compose at runtime, not at build time.

## Getting started

**Prerequisites:** Node 22 (`nvm use` reads `.nvmrc`) and pnpm 10.

```bash
git clone https://github.com/jasondaihl/plinth.git
cd plinth
pnpm install
pnpm build
```

Then launch the Storybook working surface:

```bash
pnpm dev --filter @plinth/storybook
```

Storybook will open on http://localhost:6006 with the welcome doc and live token swatches.

## Workspace scripts

Run from the repo root; Turbo handles fan-out, dependency ordering, and caching.

| Script               | What it does                                                |
| -------------------- | ----------------------------------------------------------- |
| `pnpm build`         | Builds every package in dependency order                    |
| `pnpm dev`           | Runs dev mode in every package that defines it (persistent) |
| `pnpm lint`          | ESLint across the workspace                                 |
| `pnpm typecheck`     | `tsc --noEmit` across the workspace                         |
| `pnpm test`          | Vitest across the workspace                                 |
| `pnpm format`        | Prettier write                                              |
| `pnpm format:check`  | Prettier check (CI-friendly)                                |
| `pnpm changeset`     | Author a new changeset                                      |
| `pnpm version-packages` | Apply changesets, bump versions, update changelogs       |
| `pnpm release`       | Build everything, then `changeset publish`                  |

Target a single workspace with Turbo's `--filter`:

```bash
pnpm turbo run build --filter @plinth/tokens
pnpm turbo run test  --filter @plinth/components
```

## Consuming the packages

### `@plinth/tokens`

Three CSS entrypoints, one per layer — import only the layers you need:

```css
/* app.css */
@import "tailwindcss";
@import "@plinth/tokens/css/primitive";
@import "@plinth/tokens/css/semantic";
@import "@plinth/tokens/css/brand"; /* needed only if you want Tailwind utilities */
```

The TypeScript entrypoint exposes the raw token tree and the `ref()` helper for tooling that needs to introspect tokens:

```ts
import { primitive, semantic, ref, type Semantic } from "@plinth/tokens";
```

Dark mode is opt-in by setting `data-theme="dark"` on a parent element (typically `<html>`).

### `@plinth/components`

React 19 component library, published as ESM + CJS with bundled `.d.ts`. React and React-DOM are peer dependencies.

```tsx
import { /* … */ } from "@plinth/components";
```

> **Note:** Plinth is shipped one commit at a time. The component surface is intentionally minimal at this stage — the scaffold is in place (Rollup config, exports, peer deps, testing setup), and components are being added incrementally. Check the changelog for what's available.

## Adding a new token

Always follow the layering — **never write a raw value at the semantic layer**.

1. Add the raw value at the primitive layer (`packages/tokens/src/primitive/<category>.ts`).
2. Add a role-based alias at the semantic layer (`packages/tokens/src/semantic/index.ts`) using `ref("primitive.…")`. Mirror it in `semanticDark` if it has a dark-mode variant.
3. If consumers should reach it via a Tailwind utility, register it under the appropriate `@theme` namespace in `packages/tokens/src/brand/default.ts`.
4. `pnpm --filter @plinth/tokens build` regenerates the three CSS files in `dist/`.

The build script (`packages/tokens/scripts/build.ts`) walks the token tree, kebab-cases the path, and emits `--plinth-<layer>-<path>` variables. `ref()` values become `var(--plinth-…)` lookups, so layer composition stays a runtime concern.

## Releases

Plinth uses [Changesets](https://github.com/changesets/changesets) for versioning and changelogs.

```bash
pnpm changeset            # describe a change; pick affected packages + semver bump
pnpm version-packages     # apply pending changesets → bumps versions + changelogs
pnpm release              # turbo build → changeset publish
```

`@plinth/storybook` is listed in `ignore` — it's an app, not a published artifact. Internal dependency bumps default to a `patch`.

## Continuous integration

`.github/workflows/ci.yml` runs on push and PR against `main`:

```
pnpm install --frozen-lockfile
pnpm turbo run lint typecheck build test
```

Turbo's remote cache is not yet wired up; everything builds from scratch in CI.

## License

[MIT](./LICENSE) © Jason Daihl
