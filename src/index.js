import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
import { AuthContextProvider } from "./store/auth-context";
import Login from "./components/Auth/LogIn";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import ProtectedRoutesAuth from "./components/Routes/ProtectedRoutesAuth";
import Todo from "./components/Todo/Todo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutesAuth />}>
            <Route path="*" element={<App />} />
            <Route path="*" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/todo" element={<Todo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);