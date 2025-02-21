import _ from "lodash";
import http from "./httpService";

const loginApiEndpoint = "/auth";
const tokenKey = "tukrn";

http.setJwt(getJwt()); //was for setting header

export async function login(user_name, password) {
  const { data } = await http.post(loginApiEndpoint, { password, username: user_name });
  if (!data.nextOfKins) data.nextOfKins = "false";
  saveCurrentUser(_.pick(data, ["username", "token", "nextOfKins"]));
  return;
}

export async function updateUser(payload) {
  const { data } = await http.put("/users", payload);
  if (!data.nextOfKins) data.nextOfKins = "false";
  saveCurrentUser(_.pick(data, ["username", "token", "nextOfKins"]));
}

export async function updatePassword(old_password, new_password) {
  const { data } = await http.put("/auth/password", {
    old_password,
    new_password,
  });
  saveCurrentUser({ token: data.token });
}

export async function deleteUser() {
  await http.delete("/users");
  localStorage.removeItem("username");
  localStorage.removeItem(tokenKey);
}

export async function logout() {
  // await http.post("/logout");
  localStorage.removeItem(tokenKey);
  localStorage.removeItem("username");
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function saveCurrentUser({ username, token, nextOfKins }) {
  if (username) localStorage.setItem("username", username);
  if (token) localStorage.setItem(tokenKey, token);

  if (nextOfKins) localStorage.setItem("nextOfKins", nextOfKins);
  else if (nextOfKins === "false") localStorage.removeItem("nextOfKins");
}

export function getCurrentUser() {
  return localStorage.getItem("username");
}

const authService = {
  login,
  logout,
  getCurrentUser,
  saveCurrentUser,
  getJwt,
  updateUser,
  deleteUser,
  updatePassword,
};

export default authService;