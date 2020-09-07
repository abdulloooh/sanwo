import http from "./httpService";

const registerApiEndpoint = "/users";

export function register(user) {
  return http.post(registerApiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}
