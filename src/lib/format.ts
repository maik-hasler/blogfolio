/** Date in a short English format, e.g. "26 Feb 2026". */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
