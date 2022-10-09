import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = !!localStorage.getItem("token")
  return token ? <Navigate to="/todo" /> : <Outlet/>;

};

export default ProtectedRoutes;