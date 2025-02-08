import { useRoutes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import MainRoutes from "./MainRoutes";
import PageNotFound from "../pages/Error/PageNotFound";

const Routes = () => {
    const isAuth = localStorage.getItem('auth');

    return useRoutes([
        isAuth ? MainRoutes : AuthRoutes,
        {
            path: "*", element: <PageNotFound />
        }
    ])
}

export default Routes;