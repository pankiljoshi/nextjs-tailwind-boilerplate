"use client";
import { useEffect } from "react";
import { errorToast } from "@/utils/toast";
import useAuth from "./useAuth";
import { axios } from "@/utils/axios";
import Cookies from "js-cookie";

const useAxiosPrivate = () => {
  const { user, logout } = useAuth();
  const axiosPrivate = axios;
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        const token = Cookies.get("token");
        if (token && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        console.log(error, "axiospreq");
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log(error, "errorinuseaxipp");
        const prevRequest = error?.config;
        if (error?.response?.status === 401) {
          console.log(error);
          return logout();
          // return router.push('/login' + `?from=${router.asPath}`);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [user]);

  return { axiosPrivate };
};

export default useAxiosPrivate;
