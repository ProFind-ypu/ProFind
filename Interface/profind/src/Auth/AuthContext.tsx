import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import type {
  AuthContextType,
  LoginResult,
  RegisterResult,
} from "../class/auth";
import type { User } from "../class/User";
// import type { LoginResponce } from "../class/LoginResponce";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const UseAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Restore session on mount
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get<{ user: User }>("/api/auth/me", {
          withCredentials: true,
        });

        setUser(res.data.user);
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  const register = async (
    user: User,
    password: string,
  ): Promise<RegisterResult> => {
    try {
      const respond = await axios.post(
        "/api/auth/register",
        {
          email: user.email,
          fullName: user.fullname,
          type: "student",
          uni_id: user.uniId,
          password,
        },
        { withCredentials: true },
      );
      const registereduser = jwtDecode<User>(respond.data["accessToken"]);
      //TODO: making the success code is 201 in backend
      if (respond.status === 200) {
        setUser(registereduser);
        return {
          success: true,
          message: "Registration successful",
          user: registereduser,
        };
      }

      return { success: false, message: "Registration failed" };
    } catch (err) {
      console.error("Registration failed:", err);
      return { success: false, message: "Network or server error" };
    }
  };
  const login = async (
    email: string,
    password: string,
  ): Promise<LoginResult> => {
    try {
      const respond = await axios.post(
        "/api/auth/login",
        {
          email: email,
          password,
        },
        { withCredentials: true },
      );

      if (respond.status === 200) {
        const loggeduser = jwtDecode<User>(respond.data["accessToken"]);
        // const mockuser: User = {
        //   fullname: "Ag",
        //   email: "hallowbitch@me.proton",
        //   token: undefined,
        //   roles: "student",
        //   avatarUrl: "erlthismotherfucker",
        // };
        //console.log(loggeduser);

        setUser(loggeduser);

        return {
          success: true,
          code: 200,
          message: "Login successful",
          user: loggeduser,
        };
      }

      return { success: false, code: 403, message: "Wrong credentials" };
    } catch (err) {
      console.error("Login failed:", err);
      return { success: false, code: 500, message: "Network or server error" };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
