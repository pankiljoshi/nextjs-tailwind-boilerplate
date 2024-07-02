import axios from '@/utils/axios';
import useAuth from './useAuth';
import Cookies from 'js-cookie';

const useRefreshToken = () => {
  const { setUser, logout, user } = useAuth();

  const verifyToken = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        const response = await axios.post('/auth/users/verify-token', {
          token: token,
        });
        if (!response.status) {
          logout();
        }
      }
    } catch (err) {
      console.log(err)
      logout();
    }
  };

  const refresh = async () => {
    try {
      const response = await axios.post(
        '/admin/auth/refresh',
        {},
        { withCredentials: true }
      );
      if (response.data.accessToken) {
        setUser((prev) => {
          if (!prev) {
            return null;
          }
          Cookies.set("token", response.data.accessToken, { expires: 2, path: "/" });
          return { ...prev, accessToken: response.data.accessToken };
        });
      }
      return response.data.accessToken;
    } catch (err) {
      logout();
    }
  };

  return { refresh, verifyToken };
};

export default useRefreshToken;
