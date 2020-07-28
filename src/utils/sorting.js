import { sortBy } from "underscore";

//ascending is default
export default function sortAndOrder(
  data,
  sortValue,
  orderValue,
  descendingLabel
) {
  return orderValue === descendingLabel
    ? sortBy(data, sortValue).reverse()
    : sortBy(data, sortValue);
}
