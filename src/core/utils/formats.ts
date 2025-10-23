// src/core/utils/formats.ts

/**
 * Format milliseconds to HH:MM:SS.
 * Kept local to the component to avoid cross-layer coupling.
 */
export function formatDuration(ms?: number): string {
  if (!ms || ms <= 0) return "00:00";
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}
