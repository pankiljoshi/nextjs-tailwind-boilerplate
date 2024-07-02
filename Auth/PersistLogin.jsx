import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

const PersistLogin = ({ children }) => {
  const { verifyToken } = useRefreshToken();
  const { user: auth, isLoading, setIsLoading, loggedInUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;
    const verifyUserToken = async () => {
      try {
        await verifyToken();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !Cookies.get("token") ? verifyUserToken() : setIsLoading(false);
    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    if (!Cookies.get("token") && !isLoading) {
      router.push("/sign-in" + `?from=${pathname}`);
    }
  }, [auth, isLoading, router]);

  return <>{auth && !isLoading ? children : '...Loading'}</>;
};

export default PersistLogin;
