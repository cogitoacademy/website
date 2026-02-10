export const EVENT_SCALES = [
  { value: "international", label: "International" },
  { value: "national", label: "National" },
] as const;

export type EventScaleValue = (typeof EVENT_SCALES)[number]["value"];

export function getEventScaleLabel(value: string): string {
  return EVENT_SCALES.find((scale) => scale.value === value)?.label || value;
}
