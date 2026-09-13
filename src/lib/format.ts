/** Datum im deutschen Kurzformat, z. B. "26. Feb. 2026". */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' });
}
