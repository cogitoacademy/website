export const LOCATIONS = [
  { value: "online", label: "Online" },
  { value: "offline_surabaya", label: "Offline - Surabaya" },
  { value: "offline_semarang", label: "Offline - Semarang" },
  { value: "offline_jakarta", label: "Offline - Jakarta" },
] as const;

export type LocationValue = (typeof LOCATIONS)[number]["value"];

/**
 * Get display label for a location value
 */
export function getLocationLabel(value: string): string {
  return LOCATIONS.find((loc) => loc.value === value)?.label || value;
}
