import { useEffect, useRef, useState } from "react";
import blogService from "./services/blog-service.js";
import loginService from "./services/login-service.js";
import LoginForm from "./components/LoginForm.jsx";
import BlogsList from "./components/BlogsList.jsx";
import BlogForm from "./components/BlogForm.jsx";
import Notification from "./components/Notification.jsx";
import { NotificationType } from "./constants/enums.js";
import Toggleable from "./components/ToggleAble.jsx";

const App = () => {

    const [blogs, setBlogs] = useState(null);
    const [user, setUser] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState(NotificationType.SUCCESS);

    const addBlogToggleRef = useRef(null);

    useEffect(() => {
        (async () => {
            try {
                setBlogs(await blogService.getAllBlogs());
            } catch {
                // eslint-disable-next-line react-hooks/immutability
                showNotification('Error loading blogs', NotificationType.ERROR);
            }
        })();
    }, []);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);

            blogService.setToken(storedUser.token);
        }
    }, []);

    const showNotification = (message, type = NotificationType.SUCCESS) => {
        setNotificationMessage(message);
        setNotificationType(type);

        setTimeout(() => setNotificationMessage(''), 3000);
    };

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formUser = {
            username: formData.get("username"),
            password: formData.get("password"),
        };

        try {
            const loggedInUser = await loginService.login(formUser);

            blogService.setToken(loggedInUser.token);
            localStorage.setItem("user", JSON.stringify(loggedInUser));
            setUser(loggedInUser);
        } catch (error) {
            showNotification(error.response.data.error, NotificationType.ERROR);
        }
    };

    const handleCreateBlog = async (newBlog) => {
        try {
            const blog = await blogService.createBlog(newBlog);
            setBlogs(blogs.concat(blog));

            showNotification(`A new blog ${blog.title} by ${blog.author} has been added`);
        } catch (error) {
            showNotification(error.response.data.error, NotificationType.ERROR);
        }

        addBlogToggleRef.current.toggleVisibility();
    };

    const handleBlogLike = async (id, likes) => {
        try {
            const updatedBlog = await blogService.likeBlog(id, likes);
            setBlogs(blogs.map((blog) => blog.id === id
            ? updatedBlog
            : blog));

            showNotification(`Blog ${updatedBlog.title} by ${updatedBlog.author} has been liked`);
        } catch (error) {
            showNotification(error.response.data.error, NotificationType.ERROR);
        }
    };

    const handleLogout = () => {
        blogService.setToken(null);
        localStorage.clear();

        setUser(null);
    };

    const handleSortByLikes = () => {
        setBlogs(blogs.toSorted((a, b) => b.likes - a.likes));
    };

    const handleBlogRemove = async (id) => {
        try {
            const removedBlog = await blogService.removeBlog(id);

            showNotification(`Blog ${removedBlog.title} by ${removedBlog.author} has been removed`);
            setBlogs(blogs.filter(b => b.id !== removedBlog.id));
        } catch (error) {
            showNotification(error.response.data.error, NotificationType.ERROR);
        }
    };

    return (
        <div>
            <h2>Blogs</h2>
            <Notification message={notificationMessage} type={notificationType} />
            {user === null
                ? <LoginForm onLoginFormSubmit={handleLoginFormSubmit} />
                : <>
                    <div style={{ marginBottom: '1.5rem' }}>
                        {user.name} has logged in <button type="button" onClick={handleLogout}>logout</button>
                    </div>
                    <div>
                        <button onClick={handleSortByLikes}>sort by likes</button>
                        <Toggleable buttonLabel='new blog' ref={addBlogToggleRef}>
                            <h2>Create new</h2>
                            <BlogForm onCreateBlog={handleCreateBlog} />
                        </Toggleable>
                        <br/>
                        <BlogsList blogs={blogs}
                                   onBlogLike={handleBlogLike}
                                   onBlogRemove={handleBlogRemove}
                                   currentUser={user}/>
                    </div>
                </>
            }
        </div>
    );
};

export default App;
