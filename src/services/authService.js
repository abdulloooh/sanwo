import http from "./httpService";

const loginApiEndpoint = "/auth";
const tokenKey = "tukrn";

http.setJwt(getJwt()); //was for setting header

export async function login(user_name, password) {
  const {
    data: { username, nextOfKin, token },
  } = await http.post(loginApiEndpoint, {
    password,
    username: user_name,
  });
  saveCurrentUser({ username, nextOfKin, token });
}

export async function updateUser(username, email, nextOfKin) {
  const {
    data: { username, token },
  } = await http.put("/users", { username, email, nextOfKin });
  saveCurrentUser({ username, token });
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

export function saveCurrentUser({ username, nextOfKin, token }) {
  if (token) localStorage.setItem(tokenKey, token);
  if (username) localStorage.setItem("username", username);
  if (nextOfKin) localStorage.setItem("nextOfKin", nextOfKin);
}

export function getCurrentUser() {
  return localStorage.getItem("username");
}

export default {
  login,
  logout,
  getCurrentUser,
  saveCurrentUser,
  getJwt,
  updateUser,
  deleteUser,
  updatePassword,
};
