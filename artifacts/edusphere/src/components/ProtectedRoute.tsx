import { useLocation } from "wouter";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'student' | 'parent' | 'principal' | 'teacher')[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { state: auth } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!auth.isAuthenticated || !auth.user) {
      setLocation("/login");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(auth.user.role)) {
      setLocation(`/${auth.user.role}/dashboard`);
    }
  }, [auth.isAuthenticated, auth.user, allowedRoles, setLocation]);

  if (!auth.isAuthenticated || !auth.user) return null;
  if (allowedRoles && !allowedRoles.includes(auth.user.role)) return null;

  return <>{children}</>;
}
