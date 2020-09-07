import http from "./httpService";

const registerApiEndpoint = "/users";

export function register(user) {
  return http.post(registerApiEndpoint, {
    username: user.username,
    password: user.password,
  });
}
