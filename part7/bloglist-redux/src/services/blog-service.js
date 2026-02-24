import axios from 'axios';

const baseUrl = '/api/blogs';

let token = '';

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAllBlogs = async () => {
  const res = await axios.get(baseUrl);

  return res.data;
};

const createBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const res = await axios.post(baseUrl, blog, config);

  return res.data;
};

const likeBlog = async (id, likes) => {
  const res = await axios.patch(`${baseUrl}/${id}`, { likes: ++likes });

  return res.data;
};

const removeBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const res = await axios.delete(`${baseUrl}/${id}`, config);

  return res.data;
};

export default { getAllBlogs, createBlog, likeBlog, removeBlog, setToken };
