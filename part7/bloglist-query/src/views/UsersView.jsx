import { useQuery } from "@tanstack/react-query";
import * as userService from "../services/user-service.js";
import { Link } from "react-router";

const UsersView = () => {

    const { data: users = [], isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: userService.fetchUsers
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (isError) {
        return <div>Could not load user info</div>;
    }

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Blog count</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>
                            <Link to={`/users/${user.id}`}>{user.username}</Link>
                        </td>
                        <td>{user?.blogs?.length || 0}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersView;