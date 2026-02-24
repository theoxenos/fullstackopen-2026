import { useContext } from "react";
import UserContext from "../contexts/UserContextProvider.jsx";
import { Navigate, Outlet, useLocation } from "react-router";

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const { user } = useContext(UserContext);

    if (!user) {
        console.log("User not logged in");
        return <Navigate to="/login" state={{ from: location.pathname }} replace/>;
    }

    return children ? children : <Outlet/>;
};

export default RequireAuth;