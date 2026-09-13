# blogfolio

Personal blog and portfolio site (maik-hasler.de), German-language content.
Solo-maintained.

## Tech Stack

Astro 6 (static output, Node adapter), Tailwind CSS 4, MDX. Content is an
Astro content collection at `src/content/blog` (blog posts). Deployed as a
Docker image published to GHCR on version tags
(`.github/workflows/publish.yaml`).

## Development Setup

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
npm run check    # astro check - typecheck + diagnostics
```

## Claude Code Configuration

- **Skills** - `.claude/skills/frontend-design/` (vendored from
  `anthropics/skills`, Apache-2.0, `LICENSE` alongside it) pushes visual
  changes toward a deliberate, non-generic design direction - typography,
  color theming, motion, spatial composition - instead of generic
  AI-layout defaults; load it before visual/layout changes to components
  or pages.
- **Hooks** - `.claude/hooks/pre-stop-verify.sh` (`Stop` hook) runs
  `npm run check` once before ending a turn if `src/` or `astro.config.ts`
  changed, blocking only on an actual failure (capped at 2 blocks per
  session so it fails open rather than risk a loop).
- **Plugins** - `typescript-lsp` is enabled in `.claude/settings.json`.
