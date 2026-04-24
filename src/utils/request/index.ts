import axios, { type AxiosInstance } from "axios";

const fetchFn: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 100000,
});

fetchFn.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("mediaManageToken");

    config.headers.setAuthorization(`Bearer ${token}`);
    return config;
  },
  (error) => {
    console.log(`Request Error>>>`, error);
  },
);
fetchFn.interceptors.response.use(
  (response) => response,
  async (error) => {
    const errorMessage = error?.response?.data?.message;
    if (error?.status === 401 && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
    const message = new Error(errorMessage || error?.message);
    return Promise.reject(message);
  },
);

export { fetchFn };
