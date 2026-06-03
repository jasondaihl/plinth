# ADR 0005: Polymorphic Component API — The `as` Prop Pattern

## Status

Accepted

## Context

Many components in Plinth need to render different HTML elements depending on context
without changing their visual appearance or behavior. A Text component might render
a `<p>` in body copy, a `<span>` inside a label, or a `<legend>` inside a form. A
Heading component might render an `<h1>` on a landing page and an `<h3>` inside a
card. Hardcoding the underlying element into the component forces consumers to work
around the component rather than with it, typically by wrapping it in an unnecessary
element or abandoning the component entirely.

The component API needs a mechanism for consumers to control the rendered element
while preserving the component's visual and behavioral contract.

## Decision

Plinth components that need element flexibility accept an `as` prop that controls
the underlying HTML element. The `as` prop is fully typed in TypeScript -- when a
consumer passes `as="a"`, the component accepts anchor-specific props like `href`.
When they pass `as="button"`, it accepts button-specific props like `type`. The
default element for each component is chosen to be the most semantically appropriate
choice for the component's primary use case.

## Alternatives Considered

**A separate component per element** -- for example, `<Paragraph>`, `<Span>`, and
`<Legend>` as distinct components -- was considered. This avoids the complexity of
polymorphic typing but produces an explosion of components that are visually identical
and differ only in their rendered element. It also forces consumers to import multiple
components where one would do, and makes it harder to change the rendering element
in response to context without restructuring the JSX tree.

**A `className` escape hatch only** -- providing no element control and relying on
consumers to wrap components in their own elements -- was rejected because it produces
unnecessary DOM nesting and makes semantic HTML harder to achieve without fighting
the component API.

**Render props** were considered as a more flexible alternative to the `as` prop.
They were rejected for this use case because they add significant complexity to both
the implementation and the consumer API without providing meaningful additional
flexibility for the element-swapping problem specifically.

## Consequences

Polymorphic typing in TypeScript is non-trivial. The implementation requires a
generic type that intersects the component's own props with the props of the target
element, minus any conflicts. This adds complexity to the component internals but
the consumer-facing API remains simple.

The `as` prop pattern is well-established in the React ecosystem -- Radix UI,
Chakra UI, and Styled Components all use variants of it. Consumers familiar with
those libraries will recognize the pattern immediately.

All Plinth components that accept an `as` prop must document their default element
and the set of elements they are designed to support. Using `as` to render a
semantically inappropriate element -- for example, rendering a Heading as a `<span>`
-- is possible but discouraged. Accessibility implications of element choices are
the consumer's responsibility once they override the default.