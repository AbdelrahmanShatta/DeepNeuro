import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const baseURL = (Constants?.expoConfig?.extra as any)?.API_BASE_URL || "http://127.0.0.1:8888";

export const api = axios.create({ baseURL });

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as any;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (error) => {
    const message = error?.response?.data?.detail || error.message || "Request failed";
    return Promise.reject(new Error(message));
  }
);

