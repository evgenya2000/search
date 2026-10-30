type TranslationValue = string | { [key: string]: TranslationValue };

export type TranslateFn = (key: string, params?: Record<string, string | number>) => string;

export function getTranslation(
  tree: TranslationValue,
  key: string,
  params?: Record<string, string | number>
): string {
  const parts = key.split('.');
  let value: TranslationValue | undefined = tree;

  for (const part of parts) {
    if (value === undefined || typeof value === 'string') {
      value = undefined;
      break;
    }
    value = value[part];
  }

  const text = typeof value === 'string' ? value : key;

  if (!params) {
    return text;
  }

  return text.replace(/\{\{(\w+)\}\}/g, (_, paramKey) => String(params[paramKey] ?? ''));
}
