# ADR 0007: Versioning and Publishing Strategy — Changesets with Independent Package Versioning

## Status

Accepted

## Context

Plinth is a monorepo with multiple independently publishable packages --
`@plinth/tokens` and `@plinth/components` at minimum, with additional packages
likely as the system grows. These packages have different release cadences and
different consumers. A change to `@plinth/tokens` does not necessarily require a
simultaneous release of `@plinth/components`, and consumers of one package should
not be forced to upgrade the other to receive a fix or feature they need.

The versioning strategy needs to handle several concerns: tracking what changed and
why across multiple packages, determining the correct semver bump for each package
independently, generating changelogs that are useful to consumers, and providing a
mechanism for publishing pre-release versions for testing before a stable release.

## Decision

Changesets is used to manage versioning and changelog generation across all
publishable packages in Plinth. Each package is versioned independently -- a major
change to `@plinth/tokens` does not force a major bump on `@plinth/components`
unless that package is also affected. A GitHub Actions workflow handles publishing
to npm on merge to main. A separate alpha channel workflow publishes pre-release
versions from feature branches for testing against real consuming applications
before a change is promoted to a stable release.

## Alternatives Considered

**Manual semver** -- updating package.json versions and writing changelog entries
by hand -- was rejected immediately. It is error-prone, easy to forget, and produces
inconsistent changelog quality. It also requires the author to remember to do it
at release time rather than at the time the change is made, when the context is
freshest.

**semantic-release** automates versioning by analyzing commit messages according to
the Conventional Commits specification. It was considered but not chosen because it
couples the versioning decision to the commit message format, which is a rigid
constraint that can produce incorrect version bumps when commit messages are
imprecise. Changesets makes the versioning decision explicit -- the author writes
a changeset describing the change and its impact at the time of the change, which
produces more reliable and more readable changelogs.

**Lerna** was the dominant monorepo versioning tool for several years and supports
both fixed and independent versioning modes. It was not chosen because Changesets
has superseded it as the community standard for independent package versioning in
JavaScript monorepos, has better integration with GitHub Actions, and has a simpler
mental model.

## Consequences

Every pull request that touches a publishable package should include a changeset
file describing the change. This is a process requirement that must be enforced
through either CI checks or contributor documentation. Omitting a changeset does
not break the build but means the change will not appear in the changelog and will
not trigger a version bump on the next release.

The alpha channel workflow enables testing pre-release versions in consuming
applications before promoting to stable. This is particularly valuable for breaking
changes in `@plinth/tokens` that require coordinated updates in `@plinth/components`.
The tradeoff is that alpha versions must be cleaned up and not left as permanent
references in consuming applications.

Independent versioning means `@plinth/tokens` and `@plinth/components` can drift
apart in version numbers over time. This is intentional and desirable -- it
accurately reflects the real release history of each package -- but consumers
should consult the compatibility documentation rather than assuming version parity
between packages.