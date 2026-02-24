import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blog-service.js";
import { useLikeBlogMutation } from "../queries/blog.js";
import { NotificationType } from "../constants/enums.js";
import NotificationContext from "../contexts/NotificationContext.jsx";
import { useContext } from "react";
import BlogComments from "../components/BlogComments.jsx";
import BlogCommentForm from "../components/BlogCommentForm.jsx";
import { Button } from "react-bootstrap";

const BlogDetailView = () => {
    const { id } = useParams();

    const likeBlogMutation = useLikeBlogMutation();
    const { showNotification } = useContext(NotificationContext);

    const handleBlogLike = () => {
        likeBlogMutation.mutate({ id: blog.id, likes: blog.likes }, {
            onSuccess: (blog) => {
                showNotification(`Blog ${blog.title} by ${blog.author} has been liked`);
            },
            onError: (error) => {
                showNotification(error.response.data.error, NotificationType.ERROR);
            }
        });
    };
    
    if (likeBlogMutation.isSuccess) {
        console.log('success');
    }

    const { data: blog, isLoading, isError } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => blogService.getBlogById(id)
    });

    if (isError) {
        return <div>Error</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{blog.title} {blog.author}</h1>
            <a href={blog.url}>{blog.url}</a>
            <p>
                {blog.likes}
                <Button variant="success" size="sm" onClick={handleBlogLike}>vote</Button>
            </p>
            <p>added by {blog.user.username}</p>
            <h2>comments</h2>
            <BlogCommentForm blogId={blog.id} />
            <BlogComments comments={blog.comments}/>
        </div>
    );
};

export default BlogDetailView;