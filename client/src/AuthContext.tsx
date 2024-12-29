import React, { createContext, useState, useEffect } from "react";
import { Client } from "./ApiClient/client";
import { AuthContextProps } from "./interfaces/context.interfaces";
import { ComponentInterface } from "./interfaces/general.interface";




export const AuthContext = createContext<AuthContextProps | undefined>(undefined);


export const AuthProvider: React.FC<ComponentInterface> = ({ children }: ComponentInterface) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkStatus = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        await Client.get("/auth/profile"); 
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  
  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <AuthContext.Provider value={{isAuthenticated, checkStatus}}>
      {children}
    </AuthContext.Provider>
  );
};


