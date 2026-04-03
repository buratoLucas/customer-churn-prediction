# Altan OS

Altan OS is a local-first personal finance desktop app scaffold for Ubuntu, built with Tauri + React + TypeScript + Tailwind + Drizzle ORM.

## Current status

This commit delivers the initial build foundation:

- Tauri desktop shell scaffold (`src-tauri/`)
- React + TypeScript frontend scaffold
- Tailwind and theme tokens (light/dark)
- App layout shell (sidebar, topbar, Atlas FAB)
- Initial screen/component folder structure
- Drizzle SQLite schema for all core domain tables
- Drizzle config and migration folder bootstrap

## Run

```bash
npm install
npm run dev
```

## Notes

- This is the first scaffold phase and intentionally focuses on architecture and schema.
- Business logic for confirmation gates, duplicate checks, transfer integrity and Atlas workflow will be implemented in subsequent commits.


## GitHub private deployment (manual)

I cannot directly create repositories in your GitHub account from this environment (no account auth/token access), but you can deploy this scaffold to a **new private repo** with:

```bash
git init
git add .
git commit -m "Initial scaffold: Altan OS"
gh repo create altan-os --private --source=. --remote=origin --push
```

After pushing, run the included GitHub Actions workflow from **Actions → Build Altan OS**.

## Production HTML preview

A static production-style preview is included at:

- `production-preview.html`

Open it locally in your browser to preview the current dashboard shell.
