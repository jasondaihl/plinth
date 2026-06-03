# ADR 0004: Component Build Tooling — Rollup over Vite and tsup

## Status

Accepted

## Context

The `@plinth/components` package is a library -- it is not an application. It needs
to be built into a distributable format that can be consumed by downstream applications
regardless of their own build tooling. The build output needs to include ES module and
CommonJS formats, TypeScript declaration files, and source maps. Tree-shaking support
is important so consuming applications only bundle the components they actually use.

The three tools most commonly used for this purpose in the React ecosystem at the time
of this decision were Rollup, Vite library mode, and tsup.

## Decision

Rollup was chosen as the build tool for `@plinth/components`.

## Alternatives Considered

**Vite library mode** uses Rollup under the hood and adds a layer of convention on
top of it. For application builds, Vite's dev server and HMR are significant
advantages. For a library build, those features are irrelevant -- the only thing that
matters is the output. Using Vite library mode would add Vite as a dependency without
providing any meaningful benefit over using Rollup directly. Storybook handles the
development environment for component work, so Vite's dev server is not needed here.

**tsup** is a zero-config library build tool built on esbuild. It is fast and simple
to configure. It was not chosen because esbuild's tree-shaking is less mature than
Rollup's, and fine-grained control over the output format -- particularly around CSS
handling and external dependency declaration -- is easier to achieve with Rollup's
explicit plugin model.

**Rollup** was chosen because it was purpose-built for library bundling, produces
clean and predictable output, has a mature plugin ecosystem, and gives explicit control
over every aspect of the build. The configuration is more verbose than tsup but the
tradeoffs are visible and understandable rather than hidden behind abstraction.

## Consequences

Rollup configuration is more explicit than tsup. Adding new output formats or
handling edge cases requires understanding the Rollup plugin model. This is acceptable
given that the build configuration for a component library changes infrequently once
it is stable.

CSS handling -- particularly for Tailwind output -- requires careful configuration
to ensure styles are either bundled with the component output or clearly documented
as a peer dependency that consuming applications must include. This is an ongoing
consideration as the component library grows.