import { useEffect, useState } from "react";
import axios from "axios";

const Member = ({ setReceiverId }: { setReceiverId: (id: string) => void }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setError("No token found");
                return;
            }
    
            try {
                const res = await axios.get("http://localhost:5001/api/auth/fetchuser", {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });
    
                console.log(res.data);
                setUsers(res.data);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError("Error fetching users");
            }
        };
        fetchUsers();
    }, []);
    
    // if (loading) {
    //     return <div className="text-center text-gray-500 mt-4">Loading users...</div>;
    // }

    if (error) {
        return <div className="text-center text-red-500 mt-4">{error}</div>;
    }

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='max-w-lg mx-auto bg-white rounded-lg shadow-md mt-9 p-4'>
            <input
                type="text"
                placeholder='Search users...'
                className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <h2 className="text-lg font-semibold my-4 text-gray-800">People</h2>
            <div className="space-y-3">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <div
                            key={user._id}
                            onClick={() => setReceiverId(user._id)}
                            className='flex items-center p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer'
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                                <img src={user.avatarUrl || "vite.svg"} className='w-full h-full object-cover' alt={user.name} />
                            </div>
                            <div className='ml-3'>
                                <p className="font-medium text-gray-800">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.status || "Hey there..."}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No users found.</p>
                )}
            </div>
        </div>
    );
};

export default Member;
