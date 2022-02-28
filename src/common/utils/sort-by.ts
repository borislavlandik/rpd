/**
 * Sort list ascending by property
 *
 * @param list - list to sort
 * @param prop - property name
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
 * Sort list descending by property
 *
 * @param list - list to sort
 * @param prop - property name
 */
export function sortByDesc<T>(list: Array<T>, prop: keyof T): Array<T> {
  return sortByAsc(list, prop).reverse();
}
