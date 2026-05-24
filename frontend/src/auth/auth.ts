/*
export const getToken = () => localStorage.getItem("token");

export const getRole = () => {
  const token = getToken();
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.role;
};

export const isAuthenticated = () => !!getToken();

export const isAdmin = () => {
  const role = getRole();
  if (!role) return false;

  return role === "ADMIN" || role === "ROLE_ADMIN";
};

export const logout = () => {
  localStorage.removeItem("token");
}; */

/* 2.
import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const decoded: any = jwtDecode(token);

  return decoded.exp * 1000 > Date.now();
};

export const isAdmin = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const decoded: any = jwtDecode(token);

  return decoded.role === "ADMIN";
}; */

import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  // 🔥 JWT format kontrolü (EN ÖNEMLİ SATIR)
  if (token.split(".").length !== 3) return false;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const isAdmin = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;
  if (token.split(".").length !== 3) return false;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.role === "ADMIN";
  } catch {
    return false;
  }
};
