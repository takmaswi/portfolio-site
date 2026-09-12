export function roomState(progress: number, mobile = false, reduced = false) {
  const p = reduced
    ? 0
    : Math.min(1, Math.max(0, Number.isFinite(progress) ? progress : 0));
  const phase = (start: number, end: number) => {
    const t = Math.min(1, Math.max(0, (p - start) / (end - start)));
    return t * t * (3 - 2 * t);
  };
  const opening = phase(0.07, 0.52);
  return {
    progress: p,
    opening,
    portraitOpacity: 1 - phase(0.3, 0.49),
    portraitX: (mobile ? 0 : 2.2) + 3.8 * phase(0.21, 0.53),
    cameraX: 0,
    cameraZ: (mobile ? 15.4 : 12) - 1.7 * phase(0.08, 0.48),
    ceilingY: 5.6 + 4 * opening,
    display: phase(0.35, 0.55),
    warmth: phase(0.65, 1),
  };
}
