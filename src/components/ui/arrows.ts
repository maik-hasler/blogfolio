/**
 * Handgezeichnete Pfeile wie im Steckbrief. Farbe kommt über currentColor.
 * Die Pfade sind bewusst leicht "wackelig"; die Pfeilspitzen sind offene Winkel.
 * pathLength="1" erlaubt Zeichen-Animationen mit stroke-dasharray: 1, unabhängig von der echten Länge.
 */
export const arrows = {
  swoosh: { viewBox: '0 0 160 90', body: `<path pathLength="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M6.0 22.0 C 40.0 2.0, 72.0 4.0, 96.0 26.0 C 136.0 60.0, 150.0 68.0, 154.0 70.0"/><path pathLength="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M144.8 56.9 L 154.0 70.0 L 138.0 70.3"/>` },
  hook: { viewBox: '0 0 110 120', body: `<path pathLength="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" d="M10.0 14.0 C 56.0 4.0, 98.0 22.0, 96.0 62.0 C 84.0 100.0, 72.0 112.0, 72.0 112.0"/><path pathLength="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" d="M93.0 105.5 L 72.0 112.0 L 78.4 90.9"/>` },
  loop: { viewBox: '0 0 120 175', body: `<path pathLength="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6" stroke-dasharray="14 12" d="M104.0 12.0 C 60.0 -6.0, 8.0 22.0, 24.0 56.0 C 66.0 70.0, 66.0 100.0, 66.0 100.0 C 66.0 140.0, 66.0 160.0, 66.0 160.0"/><path pathLength="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6" d="M76.3 140.6 L 66.0 160.0 L 55.7 140.6"/>` },
  short: { viewBox: '0 0 90 40', body: `<path pathLength="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" d="M6.0 20.0 C 30.0 10.0, 54.0 12.0, 82.0 22.0"/><path pathLength="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" d="M71.1 10.3 L 82.0 22.0 L 66.2 24.5"/>` },
} as const;

export type ArrowKind = keyof typeof arrows;
