import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RutaProtegidaAdmin = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const decodedTokenUsu = jwtDecode(token);

  if (decodedTokenUsu.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutaProtegidaAdmin;
