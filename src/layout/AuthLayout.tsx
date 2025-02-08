import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Auth/Navbar";

const AuthLayout = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  
  return (
    <div className=" w-9/12 mx-auto py-5 min-h-screen overflow-hidden flex flex-col justify-between">
      <div>
        <Navbar />
        <div className="lg:w-6/12 mx-auto">
        <Outlet />
        </div>
      </div>

        <div className="flex justify-between lg:w-6/12 mx-auto">
        <p className="font-semibold">
          {isLogin ? "Don't have an account?" : "I already have an account."}
        </p>
        <Link to={isLogin ? "/signup" : "/login"} className="text-primary-text underline">
          {isLogin ? "Signup" : "Login"}
        </Link>

        </div>
    </div>
  );
};

export default AuthLayout;
