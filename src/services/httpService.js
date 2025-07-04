import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

// axios.create({
//   withCredentials: true,
// });

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response && error.response.status >= 400 && error.response.status < 500;

  // Unexpected (Network down, server down, db down, bug in code)
  // log the error
  // Display a generic and friendly error message eg unexpected error encountered
  if (!expectedError) {
    toast.error("Ouch! Unexpected error, please log in again");
    localStorage.removeItem("username");
    localStorage.removeItem("tukrn"); // token key, check `authService.js`

    logger.log(error);
    setTimeout(() => {
      window.location = "/login";
    }, 300);
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["authorization"] = `Bearer ${jwt}`;
}

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  setJwt,
};

export default httpService;