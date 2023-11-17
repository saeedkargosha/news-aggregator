import configs from "@/configs";
import { AxiosInstance } from "axios";

export const setInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(config => {
    if (configs.app.apiKey) {
      config.headers.Authorization = configs.app.apiKey;
    }
    return config;
  });
};
