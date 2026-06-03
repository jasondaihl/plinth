# ADR 0003: Package Manager — pnpm over npm and Yarn

## Status

Accepted

## Context

Plinth is a monorepo with multiple packages that depend on each other and share
common tooling. The choice of package manager affects workspace support, dependency
resolution strictness, disk usage, and install performance. All three major package
managers -- npm, Yarn, and pnpm -- support workspaces, but they differ meaningfully
in how they handle these concerns.

## Decision

pnpm was chosen as the package manager for Plinth.

## Alternatives Considered

**npm workspaces** have been available since npm 7 and are the lowest-friction option
since npm ships with Node.js. However, npm hoists all dependencies into a single
`node_modules` at the root, which means packages can silently import dependencies
they did not declare. This phantom dependency problem is particularly risky in a
monorepo where packages are meant to be independently publishable -- a package that
accidentally relies on a hoisted dependency will fail when consumed outside the
monorepo.

**Yarn Classic (v1)** is widely used but effectively unmaintained. Yarn Berry (v2+)
addresses many of Yarn Classic's shortcomings but introduces significant complexity
through Plug'n'Play, which has inconsistent support across editors and tooling.

**pnpm** uses a content-addressable store and symlinked `node_modules` structure that
makes phantom dependencies impossible -- a package can only import what it has
explicitly declared. It is also significantly faster than npm on repeated installs and
uses far less disk space by storing each version of a package once globally and
symlinking it into projects. Workspace support is first-class and well-documented.

## Consequences

Dependency declarations must be explicit. This is a feature, not a limitation -- it
ensures each package in the monorepo is honest about what it depends on and will
work correctly when published independently.

The pnpm store lives outside the repo and must be accounted for in CI caching
configuration. The `.npmrc` file must set `shamefully-hoist=false` (the default)
to preserve strict dependency resolution. Engineers unfamiliar with pnpm may need
a brief orientation to understand why the `node_modules` structure looks different
from what npm or Yarn produce.