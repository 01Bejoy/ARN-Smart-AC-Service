import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  role?: string;
};

export default function ProtectedRoute({
  children,
  role,
}: Props) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const parsedUser = JSON.parse(user);

  if (role && parsedUser.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}