// import { createContext, useContext, useEffect, useState } from 'react';
// import api from '../lib/api';
// import Router from 'next/router';

// const AuthCtx = createContext(null);

// export default function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [bootstrapped, setBootstrapped] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setBootstrapped(true);
//       return;
//     }

//     api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
//       .then(({ data }) => setUser(data.user))
//       .catch((err) => {
//         if (err.response?.status === 401) {
//           // Only remove token if truly invalid
//           localStorage.removeItem('token');
//         } else {
//           console.error("Auth check failed:", err.message);
//         }
//       })
//       .finally(() => setBootstrapped(true));
//   }, []);


//   const login = async (email, password) => {
//     const { data } = await api.post('/auth/login', { email, password });
//     localStorage.setItem('token', data.token);
//     setUser(data.user);
//     Router.push('/tasks');
//   };


//   const register = async (name, email, password) => {
//     await api.post('/auth/register', { name, email, password });
//     // After register, direct to login
//     Router.push('/login?registered=1');
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     Router.push('/login');
//   };

//   return <AuthCtx.Provider value={{ user, login, register, logout, bootstrapped }}>{children}</AuthCtx.Provider>;
// }

// export function useAuth() {
//   return useContext(AuthCtx);
// }


// src/context/AuthContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // ✅ expose setUser
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user); // store user
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user); // update context
    router.push("/tasks");
  };

  const register = async (name, email, password) => {
    await api.post("/auth/register", { name, email, password });
    router.push("/login?registered=1");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

