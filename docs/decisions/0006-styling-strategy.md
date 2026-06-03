# ADR 0006: Styling Strategy — Tailwind Utility Classes Driven by Design Tokens

## Status

Accepted

## Context

Plinth components need a styling approach that is consistent, maintainable, and
connected to the token system. The styling strategy determines how design decisions
flow from tokens into components, how consumers can customize appearance, and what
the resulting CSS looks like in consuming applications.

Several approaches are in common use in the React component library ecosystem:
CSS Modules, vanilla CSS with custom properties, CSS-in-JS, and Tailwind utility
classes. Each has meaningful tradeoffs for a library context specifically -- a
library is not an application, and approaches that work well for application styling
do not always translate cleanly to a distributed component package.

## Decision

Plinth components are styled with Tailwind utility classes. Tailwind is configured
to use Plinth's semantic design tokens as its design scale -- spacing, color,
typography, radius, and shadow values all come from `@plinth/tokens` rather than
Tailwind's default scale. Components apply utility classes directly in the component
source. The Tailwind configuration is exported from `@plinth/tokens` so consuming
applications can extend or override it.

## Alternatives Considered

**CSS Modules** produce scoped, locally-namespaced class names that avoid style
collisions. They were not chosen because they require a build step in the consuming
application to process the module files, which creates a tooling dependency that not
all consumers can accommodate. They also have no natural connection to the token
system without additional tooling.

**Vanilla CSS with custom properties** -- shipping a plain `.css` file that consumers
import -- is the most portable approach. It was considered seriously and remains the
approach used for the token outputs in `@plinth/tokens`. It was not chosen as the
primary component styling mechanism because it requires maintaining a parallel CSS
file alongside the component source, which creates a synchronization burden as
components grow and change.

**CSS-in-JS** (Styled Components, Emotion) was rejected for a library context
specifically. Runtime CSS-in-JS adds bundle weight, can cause style injection ordering
issues when mixed with other CSS-in-JS libraries in a consuming application, and
creates React version coupling that limits the library's compatibility surface.

**Tailwind** was chosen because it is widely adopted in the frontend ecosystem,
has strong tooling support, produces highly optimized CSS through its purging
mechanism, and integrates naturally with a token system through its configuration
file. Building with Tailwind also directly addresses a gap in the author's recent
professional experience -- it is the most frequently requested skill in the roles
this project is designed to demonstrate competency for.

## Consequences

Consuming applications must have Tailwind configured and must include Plinth's
component source paths in their Tailwind content configuration so that the utility
classes used by components are not purged. This is a meaningful integration
requirement that must be clearly documented.

The Tailwind configuration exported by `@plinth/tokens` must be kept in sync with
the token values as the system evolves. A token change that is not reflected in the
Tailwind config will produce visual inconsistency between components that use CSS
custom properties directly and components that use Tailwind utility classes.

Tailwind's utility class approach means component markup includes many class names.
This is a common point of friction for engineers unfamiliar with utility-first CSS.
Plinth's Storybook documentation should clearly explain the styling approach and
how to work with it.