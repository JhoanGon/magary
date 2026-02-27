export type DemoLanguage = 'es' | 'en';

export function isDemoLanguage(
  value: string | null | undefined,
): value is DemoLanguage {
  return value === 'es' || value === 'en';
}
