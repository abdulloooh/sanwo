import http from "./httpService";

export function getIndividualSummary() {
  return http.get("/summary");
}
