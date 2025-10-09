import { NextResponse } from "next/server";

type QuoteResponse = {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: Date;
  dateModified: Date;
};

function wrapText(text: string, maxChars: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (test.length <= maxChars) {
      current = test;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function GET() {
  const data = (await fetch("http://api.quotable.io/random").then((r) =>
    r.json()
  )) as QuoteResponse;
  const { content, author, tags } = data;
  const tag = tags && tags.length ? tags[0] : "general";

  const width = 760;
  const fontSize = 18;
  const lineHeight = 28;
  const maxCharsPerLine = 70;

  const contentLines = wrapText(content, maxCharsPerLine);
  const contentBlockHeight = contentLines.length * lineHeight;
  const padding = 28;
  const footerHeight = 56;
  const height = padding * 2 + contentBlockHeight + footerHeight;

  const tspans = contentLines
    .map(
      (line, i) =>
        `<tspan x="${padding}" dy="${
          i === 0 ? fontSize : lineHeight
        }">${line}</tspan>`
    )
    .join("");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#111827" />
      </linearGradient>
      <filter id="shadow">
        <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#000" flood-opacity="0.5" />
      </filter>
    </defs>

    <rect x="8" y="8" rx="14" ry="14" width="${width - 16}" height="${
    height - 16
  }" fill="url(#g)" filter="url(#shadow)" />

    <g font-family="Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" fill="#fff">
      <text x="${padding}" y="${
    padding + fontSize
  }" font-size="${fontSize}" font-weight="600">${tspans}</text>
    </g>

    <text x="${padding}" y="${
    padding + contentBlockHeight + 32
  }" font-family="Inter, Arial, sans-serif" font-size="14" fill="#9ca3af">— ${author}</text>

    <g font-family="Inter, Arial, sans-serif" font-size="12">
      <rect x="${width - padding - 100}" y="${
    padding + contentBlockHeight + 8
  }" rx="12" ry="12" width="100" height="28" fill="#0ea5a2" opacity="0.95" />
      <text x="${width - padding - 50}" y="${
    padding + contentBlockHeight + 26
  }" fill="#022" font-weight="700" text-anchor="middle">${tag}</text>
    </g>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
    },
  });
}
