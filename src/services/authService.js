// import JwtDecode from "jwt-decode";
import http from "./httpService";

const loginApiEndpoint = "/auth";
// const tokenKey = "_token_manager_debt_db_";

// http.setJwt(getJwt()); //was for setting header

export async function login(username, password) {
  const { data } = await http.post(loginApiEndpoint, {
    username: username,
    password: password,
  });
  // const jwt = headers["x_auth_token"];
  // localStorage.setItem(tokenKey, jwt);
  saveCurrentUser(data.username);
}

export async function updateUser(username, email) {
  const { data } = await http.put("/users", { username, email });
  // const jwt = headers["x_auth_token"];
  // localStorage.setItem(tokenKey, jwt);
  saveCurrentUser(data.username);
}

export async function updatePassword(old_password, new_password) {
  await http.put("/auth/password", {
    old_password,
    new_password,
  });
  // const jwt = headers["x_auth_token"];
  // localStorage.setItem(tokenKey, jwt);
}

export async function deleteUser() {
  await http.delete("/users");
  localStorage.removeItem("username");
  // localStorage.removeItem(tokenKey);
}

export async function logout() {
  await http.post("/logout");
  // localStorage.removeItem(tokenKey);
  localStorage.removeItem("username");
}

// export function getCurrentUser() {
//   try {
//     return JwtDecode(getJwt());
//   } catch (ex) {
//     return null;
//   }
// }

// export function getJwt() {
//   return localStorage.getItem(tokenKey);
// }

// export function loginWithJWT(jwt) {
//   localStorage.setItem(tokenKey, jwt);
// }

export function saveCurrentUser(username) {
  localStorage.setItem("username", username);
}

export function getCurrentUser() {
  return localStorage.getItem("username");
}

export default {
  login,
  // loginWithJWT,
  logout,
  getCurrentUser,
  saveCurrentUser,
  // getJwt,
  updateUser,
  deleteUser,
  updatePassword,
};
