import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import UserContext, { clearUser } from "../contexts/UserContextProvider.jsx";
import { Button, Container, Nav, Navbar, NavItem } from "react-bootstrap";

const NavigationMenu = () => {
    const { user, userDispatch } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/', { replace: true });
        setTimeout(() => userDispatch(clearUser()), 1);
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <NavItem>
                        <Link className="nav-link" to="/">Blogs</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/users">Users</Link>
                    </NavItem>
                </Nav>
                <Nav>
                    {user
                        ? (
                            <NavItem className="d-flex align-items-center">
                                {user.username} logged in <Button variant="link"
                                                                  onClick={handleLogout}>logout</Button>
                            </NavItem>
                        )
                        : (
                            <NavItem>
                                <Link className="nav-link" to="/login">Login</Link>
                            </NavItem>
                        )
                    }
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavigationMenu;