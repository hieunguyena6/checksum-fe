import axios from "axios";
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = process.env.REACT_APP_SERVICE_URL;

axiosInstance.interceptors.request.use(function (config) {
  if (window.localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.code === 401) {
    window.localStorage.clear();
    window.location.href="/login";
  }
  return Promise.reject(error);
});

export default axiosInstance