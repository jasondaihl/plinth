# Plinth — contributor notes

Project-wide guidance for contributors (including Claude Code).

## Releases & changesets

Any change that touches a **published** package must ship with a changeset
before merging to `main`. Published packages are everything under `packages/`
that is not listed in `.changeset/config.json`'s `ignore` field — currently
`@plinth/tokens` and `@plinth/components`.

Workflow:

```sh
pnpm changeset        # interactive — pick packages, bump type, write summary
```

Changeset files live in `.changeset/*.md` and are consumed by
`pnpm version-packages` / `pnpm release`.

**Exempt from this rule:** changes scoped entirely to `apps/storybook`,
`tooling/`, `docs/`, root config, or any other workspace listed in the
changeset `ignore` list. These ship without a changeset.

When in doubt: if `git diff` only touches ignored workspaces, skip the
changeset; otherwise add one.
