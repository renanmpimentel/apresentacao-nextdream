# PDF Export Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate and publish a static, high-fidelity PDF of the NextDream presentation as part of the GitHub Pages build.

**Architecture:** The presentation keeps a single source of truth for slides. The app selects between the immersive interactive shell and a static export shell by query param. A Node build script serves the built `dist/`, renders the export shell in headless Chromium with Playwright, captures each slide at high resolution, and assembles the final PDF into `dist/` for deployment.

**Tech Stack:** React, Vite, Vitest, Playwright, pdf-lib, GitHub Pages

---

## Chunk 1: Presentation Surface Refactor

### Task 1: Localize presentation assets and expose export mode

**Files:**
- Modify: `src/presentation/Presentation.tsx`
- Modify: `src/App.tsx`
- Create: `src/presentation/PresentationExport.test.tsx`

- [ ] Step 1: Add or update tests that assert the export query renders a static deck instead of the interactive chrome.
- [ ] Step 2: Replace remote slide assets with local imports where rendering fidelity depends on external images.
- [ ] Step 3: Remove the manual `jsPDF` path and expose a static export component that renders all slides from the same source deck.
- [ ] Step 4: Route `?export=pdf` through `App.tsx` to the export shell.
- [ ] Step 5: Run `npm test`.

## Chunk 2: Build-Time PDF Generation

### Task 2: Generate the PDF from the built site

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `scripts/generate-pdf.mjs`

- [ ] Step 1: Add dependencies for build-time browser rendering and PDF assembly.
- [ ] Step 2: Implement a local static server for `dist/`, a Playwright capture flow, and a PDF writer that saves into `dist/nextdream-apresentacao.pdf`.
- [ ] Step 3: Update the build script so site build and PDF generation run together.
- [ ] Step 4: Run `npm run build` and confirm the PDF file is created.

## Chunk 3: Deployment Pipeline

### Task 3: Publish the generated PDF with Pages

**Files:**
- Modify: `.github/workflows/deploy.yml`

- [ ] Step 1: Install Chromium in CI before the build runs.
- [ ] Step 2: Keep the deploy artifact pointing at `dist/`, which now includes the PDF.
- [ ] Step 3: Run the full local verification suite.

## Chunk 4: Verification

### Task 4: Validate the delivered artifact

**Files:**
- Modify: `src/presentation/PresentationExport.test.tsx`

- [ ] Step 1: Verify tests cover the export shell shape.
- [ ] Step 2: Run `npm test`.
- [ ] Step 3: Run `npm run typecheck`.
- [ ] Step 4: Run `npm run build`.
- [ ] Step 5: Confirm `dist/nextdream-apresentacao.pdf` exists and is non-empty.
