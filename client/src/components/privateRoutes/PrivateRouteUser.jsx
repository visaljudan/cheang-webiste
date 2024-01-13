import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const PrivateRouteUser = () => {
  const { currentUser } = useSelector((state) => state.user);
  return !currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouteUser;
