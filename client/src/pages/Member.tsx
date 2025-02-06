import React from 'react';

const Member = ({ users }) => {
    if (!users || users.length === 0) {
        return <div>Loading or No users available...</div>;
    }

    return (
        <div className='w-full bg-white rounded-lg shadow-md mt-9'>
            <div className='p-4 border-b'>
                <input
                    type="text"
                    placeholder='Search'
                    className='w-full p-2 rounded-lg border'
                />
            </div>

            <div className='p-4'>
                <h2 className="text-lg font-semibold mb-4">People</h2>
                {users.map(user => (
                    <div
                        key={user.id}
                        className='flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer'
                    >
                        <div className="mr-3 w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                            <img src={user.avatarUrl || "vite.svg"} className='w-full h-full object-cover' alt={user.name} />
                        </div>

                        <div className='flex flex-col justify-center items-center space-x-4'>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500 ">{user.status || "Hey there..."}</p>
                        </div>
                        <span className="ml-auto text-xs text-gray-500">Today</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Member;
