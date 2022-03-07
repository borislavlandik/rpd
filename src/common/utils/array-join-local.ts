/**
 *
 * @param array
 */
export function joinLocal<T>(array: Array<T>): string {
  if (array.length === 0) {
    return '';
  }

  if (array.length === 1) {
    return `${array[0]}`;
  }

  return `${array.slice(0, -1).join(', ')} и ${array.slice(-1)}`;
}
