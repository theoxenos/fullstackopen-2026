import Toggleable from "../components/ToggleAble.jsx";
import BlogForm from "../components/BlogForm.jsx";
import BlogsList from "../components/BlogsList.jsx";
import { useCreateBlogMutation } from "../queries/blog.js";
import { useContext, useRef } from "react";
import { NotificationType } from "../constants/enums.js";
import NotificationContext from "../contexts/NotificationContext.jsx";
import { Button, Row } from "react-bootstrap";

const HomeView = () => {
    const { showNotification } = useContext(NotificationContext);
    
    const createBlogMutation = useCreateBlogMutation();

    const addBlogToggleRef = useRef(null);
    
    const handleCreateBlog = async (newBlog) => {
        createBlogMutation.mutate(newBlog, {
            onSuccess: (blog) => {
                showNotification(`A new blog ${blog.title} was created successfully.`);
                addBlogToggleRef.current.toggleVisibility();
            },
            onError: (error) => {
                showNotification(error.response.data.error, NotificationType.ERROR);
            }
        });
    };
    
    const handleSortByLikes = () => {
        // setBlogs(blogs.toSorted((a, b) => b.likes - a.likes));
    };
    
    return (
        <>
            <h2>Blogs</h2>
            <Row className="mb-3 gap-2">
                <Button className="col-2" onClick={handleSortByLikes}>sort by likes</Button>
                <Toggleable buttonLabel="new blog" ref={addBlogToggleRef}>
                    <h2>Create new</h2>
                    <BlogForm onCreateBlog={handleCreateBlog}/>
                </Toggleable>
            </Row>
            <br/>
            <BlogsList />
        </>
    )
}

export default HomeView;