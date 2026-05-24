/*
import { Navigate } from "react-router-dom";
import { isAuthenticated, isAdmin } from "../auth/auth";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
} */

import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAuthenticated, isAdmin } from "../auth/auth";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    if (!isAdmin()) {
      navigate("/");
    }
  }, []);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
