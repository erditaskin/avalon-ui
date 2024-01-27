import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { QueryClient } from "@tanstack/react-query";
import localForage from "localforage";

export { useQuery } from "@tanstack/react-query";
export const queryClient = new QueryClient();

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const isServer = typeof window === "undefined";

// Config
const config: AxiosRequestConfig = {
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: null,
  },
};

const apiRequestInstance: AxiosInstance = axios.create(config);

console.log("Base URL", config.baseURL);

// Request
// https://github.com/vercel/next.js/discussions/49950#discussioncomment-6030100
apiRequestInstance.interceptors.request.use(
  async (config) => {
    if (isServer) {
      const { cookies } = await import("next/headers");
      const token = cookies().get("token")?.value;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } else {
      const token = await localForage.getItem("user-session");
      config.headers.Authorization =
        token && token !== "" ? `Bearer ${token}` : null;

      return config;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response
apiRequestInstance.interceptors.response.use(
  (response) => {
    if (
      response.status === 401 ||
      response.data?.code === 401 ||
      response.data?.code === 400
    ) {
      localForage.clear();
    }

    return response;
  },
  (error) => {
    return error;
  }
);

export const Api = apiRequestInstance;

// for delay purposes
export const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));
