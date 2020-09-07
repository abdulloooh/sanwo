import JwtDecode from "jwt-decode";
import http from "./httpService";

const loginApiEndpoint = "/auth";
const tokenKey = "_token_manager_debt_db_";

http.setJwt(getJwt());

export async function login(username, password) {
  const { data: jwt } = await http.post(loginApiEndpoint, {
    username: username,
    password: password,
  });
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    return JwtDecode(getJwt());
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function loginWithJWT(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export default {
  login,
  loginWithJWT,
  logout,
  getCurrentUser,
  getJwt,
};
