import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
