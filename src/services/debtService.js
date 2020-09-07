import http from "./httpService";

const apiEndpoint = "/debts";

function debtUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getDebts() {
  return http.get(apiEndpoint);
}

export function getDebt(id) {
  return http.get(debtUrl(id));
}

export function saveDebt(debt) {
  return http.post(apiEndpoint, debt);
}

export function updateDebt(debt) {
  return http.put(debtUrl(debt._id), debt);
}

export function deleteDebt(id) {
  http.delete(debtUrl(id));
}
