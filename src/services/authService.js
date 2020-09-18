// import JwtDecode from "jwt-decode";
import http from "./httpService";

const loginApiEndpoint = "/auth";
// const tokenKey = "_token_manager_debt_db_";

// http.setJwt(getJwt());

export async function login(username, password) {
  const { data: userNAme } = await http.post(loginApiEndpoint, {
    username: username,
    password: password,
  });
  // const jwt = headers["x-auth-token"];
  saveCurrentUser(userNAme);
}

export async function updateUser(username, password) {
  /*const { headers } =*/ await http.put("/users", {
    username: username,
    password: password,
  });
  // const jwt = headers["x-auth-token"];
  // localStorage.setItem(tokenKey, jwt);
}

export async function deleteUser() {
  await http.delete("/users");
  // localStorage.removeItem(tokenKey);
  localStorage.setItem("isLoggedIn", false);
}

export function logout() {
  // localStorage.removeItem(tokenKey);
  localStorage.setItem("isLoggedIn", false);
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
};
