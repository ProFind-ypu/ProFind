import type { User } from "./User";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<LoginResult>;
  register: (user: User, password: string) => Promise<RegisterResult>;
  logout: () => Promise<void>;
  loading: boolean;
}
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<LoginResult>;
  register: (user: User, password: string) => Promise<RegisterResult>;
  logout: () => Promise<void>;
  loading: boolean;
}

export interface LoginResult {
  success: boolean;
  code: number;
  message: string;
  user?: User;
}

export interface RegisterResult {
  success: boolean;
  message: string;
  user?: User;
}
