import http from "./httpService";

const apiEndpoint = "/debts";

function debtUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getDebts(includeCleared = false) {
  const url = includeCleared ? `${apiEndpoint}?includeCleared=true` : apiEndpoint;
  return http.get(url);
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
  return http.delete(debtUrl(id));
}

export function previewReminderEmail(debt) {
  return http.post(`${apiEndpoint}/preview-reminder`, debt);
}

export function clearDebt(id) {
  return http.patch(debtUrl(id) + "/clear");
}

export function reopenDebt(id) {
  return http.patch(debtUrl(id) + "/reopen");
}
