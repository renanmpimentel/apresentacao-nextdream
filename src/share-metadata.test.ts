import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

const indexHtml = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');

describe('share metadata', () => {
  test('defines WhatsApp-friendly social tags', () => {
    expect(indexHtml).toContain('<title>NextDream | Porque os sonhos mais bonitos não custam dinheiro</title>');
    expect(indexHtml).toContain('name="description"');
    expect(indexHtml).toContain('property="og:title"');
    expect(indexHtml).toContain('property="og:description"');
    expect(indexHtml).toContain('property="og:image"');
    expect(indexHtml).toContain('og-whatsapp.png');
    expect(indexHtml).toContain('name="twitter:card"');
    expect(indexHtml).toContain('rel="canonical"');
    expect(indexHtml).toContain('https://renanmpimentel.github.io/apresentacao-nextdream/');
  });
});
