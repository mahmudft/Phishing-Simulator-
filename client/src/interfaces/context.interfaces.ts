import { ReactNode } from "react";

export interface AuthContextProps {
  isAuthenticated: boolean;
  checkStatus: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
