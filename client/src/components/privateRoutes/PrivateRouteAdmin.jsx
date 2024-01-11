import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const PrivateRouteAdmin = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser.admin ? <Outlet /> : <Navigate to="/admin/signin" />;
};

export default PrivateRouteAdmin;
