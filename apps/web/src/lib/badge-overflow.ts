// Counter widths are indexed by hidden count minus one.
export function fitBadgeCount(
  widths: number[],
  counterWidths: number[],
  available: number,
  gap: number,
) {
  let used = widths.reduce((sum, width) => sum + width, 0) + Math.max(0, widths.length - 1) * gap;
  if (used <= available) return widths.length;
  for (let count = widths.length - 1; count >= 0; count--) {
    used -= widths[count] + (count > 0 ? gap : 0);
    const hidden = widths.length - count;
    if (used + (count > 0 ? gap : 0) + counterWidths[hidden - 1] <= available) return count;
  }
  return 0;
}
