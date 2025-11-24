import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const RutaProtegidaAdmin = ({ children }) => {
 
  const token = localStorage.getItem('token'); 
  let decodedTokenUsu;
  
  if (!token) {
    return <Navigate to="/" replace />;
  }
  if(token){
    decodedTokenUsu = jwtDecode(localStorage.getItem('token'))
    if(decodedTokenUsu.role !== "admin"){
      return <Navigate to="/" replace />;
    }
  }
  
  return children;
};

export default RutaProtegidaAdmin;