import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { fetchUserById } from "../services/user-service.js";

const UserDetailView = () => {
    const { id: userId } = useParams();
    
    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['userDetail', userId],
        queryFn: () => fetchUserById(userId),
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Loading failed</div>;
    }

    return (
        <div>
            <h1>Blogs from: {user.username}</h1>
            <h2>Added blogs</h2>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserDetailView;