import Blog from "./Blog.jsx";

const BlogsList = ({ blogs, onBlogLike, onBlogRemove, currentUser }) => {
    if (!blogs || !blogs.length) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {blogs.map((blog) => <Blog key={blog.id}
                                       blog={blog}
                                       onBlogLike={onBlogLike}
                                       onBlogRemove={onBlogRemove}
                                       canRemove={currentUser && currentUser.username === blog.user.username} />)}
        </div>
    );
};

export default BlogsList;
