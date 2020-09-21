import http from "./httpService";

const registerApiEndpoint = "/users";
const forgetPasswordEndpoint = "/users/forgetpassword";
const resetPasswordEndpoint = "/users/passwordreset";

export function register(user) {
  return http.post(registerApiEndpoint, {
    username: user.username,
    email: user.email,
    password: user.password,
  });
}

export function forgetPassword(user) {
  return http.post(forgetPasswordEndpoint, user);
}

export function resetPassword(password, resetPasswordToken) {
  return http.post(resetPasswordEndpoint, { password, resetPasswordToken });
}
