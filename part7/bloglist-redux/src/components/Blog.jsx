import { useState } from 'react';

const Blog = ({ blog, onBlogLike, onBlogRemove, canRemove }) => {

  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleDetailVisibility = () => {
    setIsDetailVisible(!isDetailVisible);
  };

  const handleRemoveClick = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${blog.title} by ${blog.author}?`,
    );

    if (confirmed) {
      onBlogRemove(blog.id);
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      <div className="blogHead">
        {blog.title} {blog.author}
        <button type="button" onClick={toggleDetailVisibility}>View/hide</button>
      </div>
      <div className="blogBody" style={{ display: isDetailVisible ? '' : 'none' }}>
        <p>{blog.url}</p>
        <p>likes {blog.likes}
          <button onClick={() => onBlogLike(blog.id, blog.likes)}>Like</button>
        </p>
        <p>{blog.user.name}</p>
        {canRemove ? (
          <button onClick={handleRemoveClick}>remove</button>
        ) : (
          <button
            disabled
            title="You can only delete your own blogs"
            style={{ opacity: 0.5, cursor: 'not-allowed' }}
          >
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
