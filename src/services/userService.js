import http from "./httpService";

const registerApiEndpoint = "/users";
const oneUserEndpoint = "/users/one";
const forgetPasswordEndpoint = "/users/forgetpassword";
const resetPasswordEndpoint = "/users/passwordreset";
const nextOfKinEndPoint = "/users/nextofkin";

export function register(user) {
  return http.post(registerApiEndpoint, {
    username: user.username,
    email: user.email,
    password: user.password,
  });
}

export function getUser() {
  return http.get(oneUserEndpoint);
}

export function forgetPassword(user) {
  return http.post(forgetPasswordEndpoint, user);
}

export function resetPassword(password, resetPasswordToken) {
  return http.post(resetPasswordEndpoint, { password, resetPasswordToken });
}

export function updateNextOfKin(data) {
  return http.post(nextOfKinEndPoint, data);
}
