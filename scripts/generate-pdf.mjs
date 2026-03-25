import { createServer } from 'node:http';
import { readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const basePath = '/apresentacao-nextdream/';
const pdfOutputPath = path.join(distDir, 'nextdream-apresentacao.pdf');
const host = '127.0.0.1';
const port = 4173;
const viewport = { width: 2560, height: 1600 };

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.jpg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
]);

function toFilePath(requestPath) {
  const urlPath = requestPath.startsWith(basePath) ? requestPath.slice(basePath.length) : requestPath.replace(/^\/+/, '');
  const normalizedPath = path.normalize(urlPath).replace(/^(\.\.(\/|\\|$))+/, '');
  const resolvedPath = normalizedPath === '' ? 'index.html' : normalizedPath;
  return path.join(distDir, resolvedPath);
}

async function serveDist() {
  const server = createServer(async (request, response) => {
    const requestUrl = new URL(request.url ?? '/', `http://${host}:${port}`);

    if (requestUrl.pathname === '/' || requestUrl.pathname === '') {
      response.writeHead(302, { Location: basePath });
      response.end();
      return;
    }

    if (!requestUrl.pathname.startsWith(basePath)) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }

    let filePath = toFilePath(requestUrl.pathname);

    try {
      const fileStats = await stat(filePath);
      if (fileStats.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
    } catch {
      filePath = path.join(distDir, 'index.html');
    }

    try {
      const body = await readFile(filePath);
      const extension = path.extname(filePath);
      response.writeHead(200, {
        'Content-Type': contentTypes.get(extension) ?? 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      response.end(body);
    } catch (error) {
      response.writeHead(500);
      response.end(`Server error: ${error instanceof Error ? error.message : 'unknown error'}`);
    }
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, () => resolve());
  });

  return server;
}

async function waitForExportSurface(page) {
  await page.waitForSelector('[data-testid="presentation-export"]');
  await page.waitForFunction(() => document.fonts.status === 'loaded');
  await page.waitForFunction(() =>
    Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0),
  );
  await page.waitForTimeout(1800);
}

async function buildPdf() {
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({
      viewport,
      deviceScaleFactor: 2,
    });

    await page.goto(`http://${host}:${port}${basePath}?export=pdf`, {
      waitUntil: 'networkidle',
    });

    await waitForExportSurface(page);

    const slideHandles = await page.locator('[data-export-slide]').elementHandles();
    const pdfDocument = await PDFDocument.create();

    for (const slideHandle of slideHandles) {
      const screenshotBuffer = await slideHandle.screenshot({
        animations: 'disabled',
        type: 'png',
      });

      const embeddedImage = await pdfDocument.embedPng(screenshotBuffer);
      const pdfPage = pdfDocument.addPage([embeddedImage.width, embeddedImage.height]);
      pdfPage.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width: embeddedImage.width,
        height: embeddedImage.height,
      });
    }

    const pdfBytes = await pdfDocument.save();
    await writeFile(pdfOutputPath, pdfBytes);
  } finally {
    await browser.close();
  }
}

const server = await serveDist();

try {
  await buildPdf();
  console.log(`Generated ${pdfOutputPath}`);
} finally {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}
