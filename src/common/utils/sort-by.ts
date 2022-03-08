/**
 * Сортировка списка объектов по заданному свойству по возрастанию
 *
 * @param list - список для сорировки
 * @param prop - ключ свойства
 */
export function sortByAsc<T>(list: Array<T>, prop: keyof T): Array<T> {
  return list.sort((a, b) => {
    if (a[prop] < b[prop]) {
      return -1;
    }

    if (a[prop] > b[prop]) {
      return 1;
    }

    return 0;
  });
}

/**
 * Сортировка списка объектов по заданному свойству по убыванию
 *
 * @param list - список для сорировки
 * @param prop - ключ свойства
 */
export function sortByDesc<T>(list: Array<T>, prop: keyof T): Array<T> {
  return sortByAsc(list, prop).reverse();
}
