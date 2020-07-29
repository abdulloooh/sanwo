import { sortBy } from "underscore";

//ascending is default
export function sortAndOrder(data, sortValue, orderValue, descendingLabel) {
  return orderValue === descendingLabel
    ? sortBy(data, sortValue).reverse()
    : sortBy(data, sortValue);
}

export function sortByDate(data, sortValue, orderValue, descendingLabel) {
  return data.sort((a, b) => {
    var dateA = new Date(a[sortValue]),
      dateB = new Date(b[sortValue]);
    return orderValue === descendingLabel ? dateB - dateA : dateA - dateB;
  });
}
