"use client";
import { createContext } from "react";
import useJwtAuth from "./useJwtAuth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const allcontext = useJwtAuth();
  return (
    <AuthContext.Provider value={allcontext}>{children}</AuthContext.Provider>
  );
};
