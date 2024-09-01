export function getTotalPages(itemsLimit: number, totalItems: number) {
  return Math.ceil(totalItems / itemsLimit);
}
