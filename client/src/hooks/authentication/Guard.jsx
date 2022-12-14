 
import Login from "../../pages/auth/Login";
import React, { Fragment, useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";  
import { useSelector, useDispatch } from "react-redux";
import {loginSuccess,selectIsAuthenticated, selectUser} from "../../redux/features/auth/authSlice";

 const GetUser = () => {
 const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  useEffect(() => {
    dispatch(loginSuccess());
  }, [dispatch]);
  return { user, isAuthenticated };
};

export const AuthorizedRoute = ({children}) => {
  const {isAuthenticated } = GetUser();
  const {pathname} = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }
  return <Fragment>{children}</Fragment>;
};

export const GuestRoute = ({
  children
}) => {
  const { isAuthenticated } = GetUser();
  
    if (isAuthenticated) {
      return <Navigate to="/dashboard" />;
    }
  return <Fragment>{children}</Fragment>;
}; 

export const AdminRoute = ({
  children
}) => {
  const {user} = GetUser();
  const {pathname} = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);
  

  if (user ?.role !== "admin") {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to={"/error"} />;
  }
  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }
  return <Fragment>{children}</Fragment>;
};

export const TeamLeaderRoute = ({
  children
}) => {
  const {user} = GetUser();
  const {pathname} = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);
  if (user.role !== "teamleader") {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to={"/error"} />;
  }
  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }
  return <Fragment>{children}</Fragment>;
}

 
export const isAdmin = () => {
  const {user} = GetUser();
  if (user.role === "admin") {
    return true;
  }
  return false;
}

//*if user is not admin disappear the child component
export const AdminComponent = ({children}) => {
  const {user} = GetUser();
  if (user.role !== "admin") {
    return null;
  }
  return <Fragment>{children}</Fragment>;
}









  