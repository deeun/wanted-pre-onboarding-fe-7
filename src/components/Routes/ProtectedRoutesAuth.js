import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const ProtectedRoutes = () => {
  const ctx = useContext(AuthContext);
  return ctx.isLoggedIn ? <Navigate to="/todo" /> : <Outlet/>;

};

export default ProtectedRoutes;