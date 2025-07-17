import { useEffect, useState } from "react";
import api from '../api/axios';

interface User {
    id: string;
    username: string;
    passwordHash: string;
    role: string;
    refreshToken: string;
    refreshTokenExpiryTime: string;
}

const UserPage = () => {

    const [users,setUsers] = useState<User[]>([]);
    const [error,setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await api.get<User[]>('/Auth/users');
                setUsers(result.data);
            }
            catch (error) {
                console.error(error)
                setError("Błąd");
            }
        };

        fetchUsers();
    },[]);

    return <>
        {error ? <h1>Error</h1> : null}
        <h1>User list</h1>
        {users.length === 0 ? <p>No users present</p> : (
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <p>{user.username}</p>
                    </li>
                ))}
            </ul>
        )}
    </>
}

export default UserPage;