import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Profile from "../components/profile/Profile";

export default function LoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));
  return user ? <Navigate to="/profile"/> : <Navigate to="/"/>;
}
