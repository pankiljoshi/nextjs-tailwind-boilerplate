import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import Cookies from "js-cookie";

const useJwtAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const unsubscribe = () => {
      setIsLoading(true);
      const token = Cookies.get("token");
      // console.log(token)
      if (token && token !== undefined) {
        fetchLoggedInUser(token);
      } else {
        setUser(null);
        setLoggedInUser(null);
      }
      setIsLoading(false);
    };
    unsubscribe();
  }, []);

  const fetchLoggedInUser = async (accessToken) => {
    try {
      if (accessToken) {
        const res = await axios.get(`/auth/users/me`, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });

        // Extracting user data
        const userData = res.data;
        setUser(userData);
        setLoggedInUser(userData)
        return userData;
      }
      return null;
    } catch (error) {
      console.log(error);
      Cookies.remove("token")
      return null;
    }
  };

  const login = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`/auth/users/signin`, data);
      const accessToken = res.data.accessToken;
      Cookies.set("token", accessToken, { expires: 2, path: "/" });
      setUser(res.data);
      fetchLoggedInUser(accessToken);
      return res.data;
    } catch (err) {
      if (err.response.status !== 403) {
        return err.response.data ? err.response.data.message : err.message;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      Cookies.remove("token", { path: "/" });
      setUser(null);
      setLoggedInUser(null);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const signUp = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`/auth/users/signup`, data);
      Cookies.set("token", res?.data?.accessToken)
      setLoggedInUser(res?.data)
      return res.data;
    } catch (err) {
      console.log(err);
      if (err.response.status !== 403) {
        return err.response.data ? err.response.data.message : err.message;
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {
    user,
    setUser,
    isLoading,
    setIsLoading,
    login,
    logout,
    signUp,
    loggedInUser,
    fetchLoggedInUser,
  };
};

export default useJwtAuth;
