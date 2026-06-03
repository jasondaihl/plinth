# ADR 0001: Three-Layer Token Architecture (Primitive, Semantic, Brand)

## Status

Accepted

## Context

Design systems that serve multiple brands face a recurring tension: how do you maintain a single source of truth for design decisions while still allowing each brand to express its own visual identity? A flat token structure — where every value is defined once and referenced directly — breaks down quickly when brands need to diverge. But fully independent token sets per brand create duplication and make system-wide changes expensive.

Plinth is designed to support multiple brands from the start. The token architecture needs to make brand expression possible without duplicating core design decisions.

## Decision

Tokens are organized into three layers:

- **Primitive** — raw values with no semantic meaning. `color.blue.500 = #3b82f6`. These are the palette, the scale, the raw material. They are never consumed directly by components.
- **Semantic** — named by purpose rather than value. `color.interactive.default` references a primitive. Components consume semantic tokens only. This layer is where design intent lives.
- **Brand** — overrides the semantic layer per brand. A brand can remap `color.interactive.default` to a different primitive without touching any component code.

## Alternatives Considered

A two-layer system (primitive and semantic only, no brand layer) was considered. This works well for a single-brand system but requires forking the semantic layer for each brand, which defeats the purpose of a shared system.

A single flat token layer was rejected immediately. It offers no mechanism for brand theming without overriding values at the component level, which is brittle and inconsistent.

## Consequences

Components are fully insulated from brand decisions. Swapping a brand is a token remapping exercise, not a component change. Adding a new brand requires only defining the brand layer — primitive and semantic layers are inherited automatically.

The tradeoff is that the three-layer model requires contributors to understand which layer a token belongs to and why. Documentation and naming conventions carry more weight as a result.