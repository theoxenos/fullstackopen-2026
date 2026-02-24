import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blog-service.js';
import { showNotification } from './notificationReducer.js';

const initialState = [];

const blogsReducer = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    addBlog: (state, action) => {
      return [...state, action.payload];
    },
    removeBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
    updateBlog: (state, action) => {
      return state.map((blog) => blog.id === action.payload.id ? action.payload : blog);
    },
  },
});

const { addBlog, setBlogs, removeBlog, updateBlog } = blogsReducer.actions;

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAllBlogs();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogService.createBlog(newBlog);
    dispatch(addBlog(blog));
    dispatch(showNotification({ message: `A new blog ${blog.title} was created` }));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogService.removeBlog(id);
    dispatch(removeBlog(id));
    dispatch(showNotification({ message: `Blog ${blog.title} was deleted` }));
  };
};

export const likeBlog = (id, likes) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.likeBlog(id, likes);
    dispatch(updateBlog(updatedBlog));
    dispatch(showNotification({ message: `Blog ${updatedBlog.title} was updated` }));
  };
};

export default blogsReducer.reducer;