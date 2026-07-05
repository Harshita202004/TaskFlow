/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    const { data } = await authApi.profile();
    setUser(data.user);
    return data.user;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      refreshProfile()
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }, 0);

    const handleExpired = () => setUser(null);
    window.addEventListener("taskflow:auth-expired", handleExpired);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("taskflow:auth-expired", handleExpired);
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login: async (payload) => {
        const { data } = await authApi.login(payload);
        setUser(data.user);
        return data.user;
      },
      register: async (payload) => {
        const { data } = await authApi.register(payload);
        setUser(data.user);
        return data.user;
      },
      logout: async () => {
        await authApi.logout().catch(() => {});
        setUser(null);
      },
      updateUser: async (payload) => {
        const { data } = await authApi.updateProfile(payload);
        setUser(data.user);
        return data;
      },
      refreshProfile,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
