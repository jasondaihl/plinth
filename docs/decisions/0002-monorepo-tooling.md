# ADR 0002: Monorepo Tooling — Turborepo over NX

## Status

Accepted

## Context

Plinth is a multi-package monorepo with distinct build, test, lint, and typecheck tasks
across packages that have dependencies on each other. A dedicated monorepo build
orchestration tool is needed to manage task execution order, avoid redundant work, and
keep the development and CI experience fast as the repo grows.

The two leading options in the JavaScript ecosystem at the time of this decision were
Turborepo and NX.

## Decision

Turborepo was chosen as the monorepo build orchestration tool.

## Alternatives Considered

**NX** is a more fully featured monorepo platform. It offers code generation, a plugin
ecosystem, project graph visualization, and fine-grained task configuration. It has
strong adoption in enterprise environments and supports a wider range of languages and
frameworks beyond JavaScript.

NX was not chosen for two reasons. First, the additional surface area -- generators,
plugins, the NX Cloud integration -- adds complexity that is not justified for a
design system of this scope. Second, Turborepo's mental model is simpler: define tasks,
declare dependencies between them, and let the pipeline figure out execution order and
caching. That simplicity makes the configuration easier to understand and maintain.

**No orchestration tool** was also considered -- relying on pnpm's built-in workspace
script running with `--filter` and `--recursive` flags. This works for small repos but
does not provide task-level caching, which is the primary performance benefit of a
dedicated orchestration layer.

## Consequences

Turborepo's remote caching (via Vercel) is available but not configured. Local caching
is active and provides meaningful speedups for repeated builds and typecheck runs.

The tradeoff is that Turborepo is less feature-rich than NX. There are no built-in
generators or project graph tools. As Plinth grows, NX's additional capabilities may
become more valuable -- this decision should be revisited if the repo grows beyond
a handful of packages or if code generation becomes a frequent need.