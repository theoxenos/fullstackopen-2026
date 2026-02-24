import axios from "axios";

const baseUrl = "/api/blogs";

let token = '';

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAllBlogs = async () => {
    const res = await axios.get(baseUrl);

    return res.data;
};

const getBlogById = async (id) => {
    const res = await axios.get(`${baseUrl}/${id}`);

    return res.data;
};

const createBlog = async (blog) => {
    const config = {
        headers: {
            Authorization: token,
        }
    };

    const res = await axios.post(baseUrl, blog, config);

    return res.data;
};

const likeBlog = async ({ id, likes }) => {
    const res = await axios.patch(`${baseUrl}/${id}`, { likes: ++likes });

    return res.data;
};

const removeBlog = async (id) => {
    const config = {
        headers: {
            Authorization: token,
        }
    };

    const res = await axios.delete(`${baseUrl}/${id}`, config);

    return res.data;
};

const createComment = async ({ id, comment }) => {
    const res = await axios.post(`${baseUrl}/${id}/comments`, { comment });

    return res.data;
};

export default { getAllBlogs, getBlogById, createBlog, likeBlog, removeBlog, setToken, createComment };
