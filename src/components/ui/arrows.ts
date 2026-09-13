/**
 * Hand-drawn arrow, as in the hero. Color comes from currentColor. The path
 * is deliberately a little "wobbly"; the arrowhead is an open angle.
 * pathLength="1" lets stroke-dasharray: 1 animate the draw-in independent of
 * the path's real length.
 */
export const arrows = {
  swoosh: { viewBox: '0 0 160 90', body: `<path pathLength="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M6.0 22.0 C 40.0 2.0, 72.0 4.0, 96.0 26.0 C 136.0 60.0, 150.0 68.0, 154.0 70.0"/><path pathLength="1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M144.8 56.9 L 154.0 70.0 L 138.0 70.3"/>` },
} as const;

export type ArrowKind = keyof typeof arrows;
