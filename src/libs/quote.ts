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

export async function fetchQuote(
  tagsParam?: string | null,
): Promise<QuoteResponse> {
  let apiUrl = "http://api.quotable.io/random";

  if (tagsParam) {
    // Support both comma and pipe separated tags
    const normalizedTags = tagsParam.replace(/\|/g, ",");
    apiUrl += `?tags=${encodeURIComponent(normalizedTags)}`;
  }

  const data = (await fetch(apiUrl).then((r) => r.json())) as QuoteResponse;
  return data;
}

export function wrapText(text: string, maxChars: number) {
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
