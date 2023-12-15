import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./contexts/AuthContext/AuthContext";

const AdminRoute = ({ component }) => {
  const { auth,handleLogin } = useContext(AuthContext);
  const { isAuthenticated, user } = auth;

  if (!isAuthenticated) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const userInfo = handleLogin();
      userInfo.then(() => {
        if (userInfo.email) {
          checkComponent(component);
        } else return <Navigate to="/login" />;
      });
    } else return <Navigate to="/login" />;
  } else {
    if (
      isAuthenticated &&
      (user.roleName === "superadmin" || user.roleName === "admin")
    ) {
      return component;
    } else if (
      isAuthenticated &&
      (user.roleName !== "superadmin" || user.roleName !== "admin")
    ) {
      return <Navigate to="/" />;
    }
  }

  function checkComponent(component) {
    if (
      isAuthenticated &&
      (user.roleName === "superadmin" || user.roleName === "admin")
    ) {
      return component;
    } else if (
      isAuthenticated &&
      (user.roleName !== "superadmin" || user.roleName !== "admin")
    ) {
      return <Navigate to="/" />;
    }
  }
};

export default AdminRoute;
