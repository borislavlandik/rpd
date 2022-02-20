/**
 * Возвращает сколение слова в зависимоти от числительного.
 *
 * @param value - числительное
 * @param pluralForms - формы слова по порядку: единственное число, именительный падеж;
 * единственное число, родительный падеж; множественное число, именительный падеж
 *
 * @example
 * // возвращает: 'медведя'
 * pluralize(2, ['медведь', 'медведя', 'медведей'])
 */
export function pluralize(value: number, pluralForms: [string, string, string]): string {
  const n = Math.abs(value) % 100;
  const decimals = n % 10;

  if (n > 10 && n < 20) {
    return pluralForms[2];
  }

  if (decimals > 1 && decimals < 5) {
    return pluralForms[1];
  }

  if (decimals === 1) {
    return pluralForms[0];
  }

  return pluralForms[2];
}

/**
 * Возвращает сколение слова в зависимоти от числительного, включая число перед словом.
 *
 * @param value - числительное
 * @param pluralForms - формы слова по порядку: единственное число, именительный падеж;
 * единственное число, родительный падеж; множественное число, именительный падеж
 *
 * @example
 * // возвращает: '2 медведя'
 * pluralizeWithNumber(2, ['медведь', 'медведя', 'медведей'])
 */
export function pluralizeWithNumber(value: number, pluralForms: [string, string, string]): string {
  return `${value} ${pluralize(value, pluralForms)}`;
}
