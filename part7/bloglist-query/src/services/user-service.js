import axios from "axios";

export const fetchUsers = async () => {
    const response = await axios.get("api/users");

    return response.data;
};

export const fetchUserById = async (userId) => {
    const response = await axios.get(`/api/users/${userId}`);

    return response.data;
};