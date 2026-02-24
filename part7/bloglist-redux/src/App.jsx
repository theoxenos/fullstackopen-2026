import { useEffect, useRef, useState } from 'react';
import blogService from './services/blog-service.js';
import LoginForm from './components/LoginForm.jsx';
import BlogsList from './components/BlogsList.jsx';
import BlogForm from './components/BlogForm.jsx';
import Notification from './components/Notification.jsx';
import { NotificationType } from './constants/enums.js';
import Toggleable from './components/ToggleAble.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from './reducers/notificationReducer.js';
import { createBlog, deleteBlog, fetchBlogs, likeBlog } from './reducers/blogReducer.js';
import { clearUser, login, setUser } from './reducers/userReducer.js';

const App = () => {

  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);

  const addBlogToggleRef = useRef(null);

  useEffect(() => {
    dispatch(fetchBlogs());
    if (!user && localStorage.getItem('user')) {
      dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
    }
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    
    blogService.setToken(user.token);
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const displayNotification = (message, type = NotificationType.SUCCESS) => {
    dispatch(showNotification({ message, type }));
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      dispatch(login(formData.get('username'), formData.get('password')));
    } catch (error) {
      displayNotification(error.response.data.error, NotificationType.ERROR);
    }
  };

  const handleCreateBlog = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog));
    } catch (error) {
      displayNotification(error.response.data.error, NotificationType.ERROR);
    }

    addBlogToggleRef.current.toggleVisibility();
  };

  const handleBlogLike = async (id, likes) => {
    try {
      dispatch(likeBlog(id, likes));
    } catch (error) {
      displayNotification(error.response.data.error, NotificationType.ERROR);
    }
  };

  const handleLogout = () => {
    blogService.setToken(null);
    localStorage.clear();
    dispatch(clearUser());
  };

  const handleSortByLikes = () => {
    // setBlogs(blogs.toSorted((a, b) => b.likes - a.likes));
  };

  const handleBlogRemove = async (id) => {
    try {
      dispatch(deleteBlog(id));
    } catch (error) {
      displayNotification(error.response.data.error, NotificationType.ERROR);
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {user === null
        ? <LoginForm onLoginFormSubmit={handleLoginFormSubmit} />
        : <>
          <div style={{ marginBottom: '1.5rem' }}>
            {user.name} has logged in <button type="button" onClick={handleLogout}>logout</button>
          </div>
          <div>
            <button onClick={handleSortByLikes}>sort by likes</button>
            <Toggleable buttonLabel="new blog" ref={addBlogToggleRef}>
              <h2>Create new</h2>
              <BlogForm onCreateBlog={handleCreateBlog} />
            </Toggleable>
            <br />
            <BlogsList blogs={blogs}
                       onBlogLike={handleBlogLike}
                       onBlogRemove={handleBlogRemove}
                       currentUser={user} />
          </div>
        </>
      }
    </div>
  );
};

export default App;
