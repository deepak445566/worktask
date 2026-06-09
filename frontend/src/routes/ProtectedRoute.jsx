import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = document.cookie;

  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
