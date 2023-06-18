export const getClearCharsCount = (value?: string | number | readonly string[]) =>
  value?.toString().replace(/\s/g, '').length ?? 0;
