import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "../api";
import { LocalStorageService } from "../services/storage/LocalStorage";

export function handleRefreshToken() {
  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = LocalStorageService.getAccessToken();
      if (token) {
        config.headers = {
          Authorization: `Bearer ${LocalStorageService.getAccessToken()}`,
          "Content-Type": "application/json",
        };
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      console.log(error.response.data);
      if (
        error.response.status === 401 &&
        "jwt expired" === error.response.data?.message &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        return api
          .refreshToken(LocalStorageService.getRefreshToken() || "")
          .then(({ accessToken, refreshToken }) => {
            LocalStorageService.setToken({
              accessToken,
              refreshToken,
            });

            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${LocalStorageService.getAccessToken()}`;
            return axios(originalRequest);
          });
      }
      // LocalStorageService.clearUser();
      return Promise.reject(error);
    }
  );
}
