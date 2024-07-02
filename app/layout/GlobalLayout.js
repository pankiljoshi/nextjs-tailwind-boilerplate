"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "@/Auth/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../globals.css";
import { usePathname } from "next/navigation";
import PersistLogin from "@/Auth/PersistLogin";
import { Suspense } from "react";
import { Provider } from "react-redux";
import Loader from "@/components/Common/StartingLoader";
import { store } from "@/store/store";

const queryClient = new QueryClient();

function GlobalLayout({ children }) {
  const pathname = usePathname();
  const noAuthRequired = ["/sign-up", "/sign-in"];

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Provider store={store}>
            <Suspense fallback={<Loader />}>
              {noAuthRequired.includes(pathname) ? (
                children
              ) : (
                <>
                  {/* // <PersistLogin> */}
                  {children}
                  {/* // </PersistLogin> */}
                </>
              )}
            </Suspense>
          </Provider>
          <ToastContainer />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default GlobalLayout;
