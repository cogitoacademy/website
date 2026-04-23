export const EDUCATION_LEVELS = [
  { value: 'sd', label: 'SD (Elementary School)' },
  { value: 'smp', label: 'SMP (Middle School)' },
  { value: 'sma', label: 'SMA (High School)' },
  { value: 'mahasiswa', label: 'Mahasiswa (University)' },
] as const;

export type EducationLevelValue = (typeof EDUCATION_LEVELS)[number]['value'];

export function getEducationLevelLabel(value: string): string {
  const normalizedValue = value.toLowerCase();
  return (
    EDUCATION_LEVELS.find((level) => level.value === normalizedValue)?.label ||
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
  );
}
