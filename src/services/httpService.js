import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  // Unexpected (Network down, server down, db down, bug in code)
  // log the error
  // Display a generic and friendly error message eg unexpected error encountered
  if (!expectedError) {
    toast.error("Unexpected error encountered");
    // toast.error("Second Unexpected error encountered", { containerId: "B" });
    logger.log(error);
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  setJwt,
};
