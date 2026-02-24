import { useContext, useEffect } from "react";
import loginService from "./services/login-service.js";
import LoginForm from "./components/LoginForm.jsx";
import Notification from "./components/Notification.jsx";
import { NotificationType } from "./constants/enums.js";
import NotificationContext from "./contexts/NotificationContext.jsx";
import UserContext, { setUser, initializeUser } from "./contexts/UserContextProvider.jsx";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import HomeView from "./views/HomeView.jsx";
import UsersView from "./views/UsersView.jsx";
import UserDetailView from "./views/UserDetailView.jsx";
import BlogDetailView from "./views/BlogDetailView.jsx";
import NavigationMenu from "./components/NavigationMenu.jsx";
import RequireAuth from "./components/RequireAuth.jsx"; 
import { Container } from "react-bootstrap";

const App = () => {
    const { showNotification } = useContext(NotificationContext);
    const { userDispatch } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        userDispatch(initializeUser());
    }, []);
    
    const redirectPath = location.state?.from || '/';

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formUser = {
            username: formData.get("username"),
            password: formData.get("password"),
        };

        try {
            const loggedInUser = await loginService.login(formUser);
            userDispatch(setUser(loggedInUser));

            navigate(redirectPath, { replace: true });
        } catch (error) {
            showNotification(error.response.data.error, NotificationType.ERROR);
        }
    };

    return (
        <Container>
            <NavigationMenu/>
            <Notification/>
            <div className="py-4">
                <Routes>
                    <Route path="/" element={<HomeView/>}/>
                    <Route element={<RequireAuth/>}>
                        <Route path="/users" element={<UsersView/>}/>
                        <Route path="/users/:id" element={<UserDetailView/>}/>
                    </Route>
                    <Route path="/blogs/:id" element={<BlogDetailView/>}/>
                    <Route path="/login" element={<LoginForm onLoginFormSubmit={handleLoginFormSubmit}/>}/>
                </Routes>
            </div>
        </Container>
    );
};

export default App;
