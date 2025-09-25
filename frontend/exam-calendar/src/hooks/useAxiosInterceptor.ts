import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AxiosError } from 'axios';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export const useAxiosInterceptor = () => {
  const { accessToken, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // REQUEST INTERCEPTOR
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        config.withCredentials = true;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE INTERCEPTOR
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const response = await api.post(
              '/auth/refresh-token',
              {},
              { withCredentials: true }
            );

            const newAccessToken = response.data.accessToken;
            if (newAccessToken) {
              login(newAccessToken);
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return api(originalRequest);
            }
          } catch (refreshError) {
            if ((refreshError as AxiosError).response?.status === 401) {
              logout();
              navigate('/login', {replace: true});
            }
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, login, logout, navigate]);
};
