/** Datum im deutschen Kurzformat, z. B. "26. Feb. 2026". */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Liest die Minuten aus dem Frontmatter-Feld `ttr` ("7 min read") heraus. */
export function readingMinutes(ttr: string): number {
  const minutes = Number.parseInt(ttr, 10);
  return Number.isNaN(minutes) ? 0 : minutes;
}
