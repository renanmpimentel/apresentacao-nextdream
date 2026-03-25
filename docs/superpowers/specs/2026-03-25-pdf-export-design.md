# PDF Export Design

**Date:** 2026-03-25

## Goal

Publish a static PDF for the NextDream presentation at a stable GitHub Pages URL, with maximum visual fidelity to the live slides.

## Approach

Use the built presentation itself as the rendering source. During the build pipeline:

1. Build the site normally with Vite.
2. Serve the built `dist/` output locally.
3. Open a dedicated export view in Chromium through Playwright.
4. Capture each slide at high resolution after fonts and images finish loading.
5. Assemble the captured images into a static PDF and save it into `dist/`.

The PDF becomes part of the deployed Pages artifact, so GitHub Pages can serve it directly without a backend.

## Key Decisions

- The PDF is rasterized, not text-selectable.
- Visual fidelity takes priority over file size.
- Slide assets that affect rendering consistency should be local to the repo.
- The export surface must reuse the same slide components as the interactive presentation.
- The old `jsPDF` hand-authored PDF path must be removed because it cannot remain faithful to the rendered UI.

## Deliverables

- Dedicated export view that renders all slides without interactive chrome.
- Build script that produces `nextdream-apresentacao.pdf`.
- GitHub Actions workflow updated to install Chromium and deploy the generated PDF with the site.
- Test coverage for export routing and static PDF availability assumptions.
