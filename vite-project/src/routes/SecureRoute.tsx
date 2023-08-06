import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const SecureRoute = () => {
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  return <div>{isLoggedIn ? <Outlet /> : <Navigate to={"/signin"} />}</div>;
};

export default SecureRoute;
