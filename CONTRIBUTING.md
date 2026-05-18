# Contributing

Thanks for helping improve Web Template Wizard.

## Setup

```bash
npm install
npm run typecheck
```

Run the CLI locally:

```bash
npm run dev -- create demo-site --app-type landing-page
```

Run a generated project:

```bash
cd demo-site
npm install
npm run dev
```

## Development guidelines

- Keep templates modular: shared behavior belongs in `templates/next/base` or `templates/next/modules`.
- Put app-specific public UI, CMS schema, default content, and admin forms in `templates/next/app-types`.
- Keep generated projects runnable with `npm install` and `npm run dev`.
- Do not add new dependencies unless they are needed by the CLI or generated output.
- Run `npm run typecheck` and `npm pack --dry-run` before opening a pull request.

## Release process

Releases are published from Git tags by GitHub Actions.

```bash
npm version patch
git push origin main --tags
```

Use `minor` or `major` instead of `patch` when the change warrants it. The release workflow publishes only when the pushed tag, such as `v0.1.2`, matches the version in `package.json`.
