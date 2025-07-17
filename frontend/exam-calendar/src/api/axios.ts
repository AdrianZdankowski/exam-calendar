import axios from "axios";
import { getAccessToken, getRefreshToken, deleteTokens, setTokens } from "../lib/auth";

const BASE_URL = 'http://localhost:5280/api';

const api = axios.create({
    baseURL: BASE_URL
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        deleteTokens();
        console.log("unathorized")
        return Promise.reject(error);
      }
      try {
        const res = await axios.post(`${BASE_URL}/Auth/refresh-token`, {
          refreshToken
        });
        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;
        setTokens(newAccessToken, newRefreshToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (error) {
        deleteTokens();
        console.log("unathorized")
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;