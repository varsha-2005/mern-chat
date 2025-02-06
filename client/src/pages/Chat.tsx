import axios from "axios";
import { useEffect, useState } from "react";


const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const currentUserId = localStorage.getItem("token");
    const receiverId = "receiverUserId"; 

    useEffect(() => {
        const fetchMessages = async ({ currentUserId, receiverId }) => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5001/api/chat/messages', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    params: {
                        params: { sender: currentUserId, receiver: receiverId }
                    }
                })
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        }
        if (currentUserId && receiverId) {
            fetchMessages();
        }
    }, [currentUserId, receiverId])

    const handleSendMessage = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/chat/sendmessages', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                sender: currentUserId,
                receiver: receiverId,
                message: newMessage
            })
            setMessages((prev) => [...prev, response.data])
            setNewMessage('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
    return (
        <div className='w-full bg-white rounded-lg shadow-md mt-9'>
            <div className='flex items-center p-4 border-b'>
                <div className='w-10 h-10 rounded-full bg-gray-300 overflow-hidden'>
                    <img src="vite.svg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className='ml-3 flex flex-col justify-start items-start'>
                    <p className='font-medium'>Receiver Name</p>
                    <p className="text-sm text-gray-500">Online</p>
                </div>
                <div className='flex items-center space-x-4 ml-auto'>
                    <button className="text-gray-500 hover:text-purple-600">
                        ⚙
                    </button>
                </div>
            </div>

            <div className='p-4 space-y-4 overflow-y-auto h-64'>
                {messages.map((msg, idx) => (
                    <div key={idx} className={msg.sender === currentUserId ? 'flex justify-end space-x-2' : 'flex justify-start space-x-2'}>
                        <div className={msg.sender === currentUserId ? 'bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg p-3 text-white' : 'bg-gray-100 rounded-lg p-3 text-black'}>
                            <p>{msg.message}</p>
                        </div>
                        <span className='text-xs text-gray-400'>{msg.timestamp}</span>
                    </div>
                ))}
            </div>

            <div className='p-4 border-t'>
                <div className='flex items-center space-x-3'>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e)=>setNewMessage(e.target.value)}
                        placeholder="Type your message here..."
                        className="p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="text-white bg-green-400 p-2 rounded-md hover:bg-green-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
