export const EDUCATION_LEVELS = [
  { value: 'smp', label: 'SMP' },
  { value: 'sma', label: 'SMA' },
  { value: 'mahasiswa', label: 'Mahasiswa' },
] as const;

export type EducationLevelValue = (typeof EDUCATION_LEVELS)[number]['value'];

export function getEducationLevelLabel(value: string): string {
  return EDUCATION_LEVELS.find((level) => level.value === value)?.label || value;
}
