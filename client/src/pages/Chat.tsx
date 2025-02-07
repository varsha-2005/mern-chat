import { useEffect, useState } from "react";
import axios from "axios";

const Chat = ({ receiverId }: { receiverId: string | null }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const currentUserId = localStorage.getItem("token");

  useEffect(() => {
    console.log(receiverId._id);
    const fetchMessages = async () => {
      if (!currentUserId || !receiverId) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5001/api/chat/messages/${receiverId._id}`,
          {
            headers: {
              Authorization: `Bearer ${currentUserId}`,
            },
          }
        );
        setMessages(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [currentUserId, receiverId]);

  const handleSendMessage = async () => {
    if (!newMessage || !currentUserId || !receiverId) return;
    try {
      const response = await axios.post(
        "http://localhost:5001/api/chat/sendmessages",
        {
          receiver: receiverId,
          message: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUserId}`,
          },
        }
      );
      setMessages(response.data);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) return <div className="text-center">Loading chat...</div>;

  return (
    <div className="w-full bg-white rounded-lg shadow-md mt-9">
      <div className="p-4 bg-gray-200 text-center font-semibold">
        Chat with {receiverId.name}
      </div>
      <div className="p-4 space-y-4 overflow-y-auto h-64 w-full">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.receiver._id === receiverId._id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            {console.log(msg.receiver._id)}
            {console.log(receiverId.id)}
            <div
              className={`p-3 rounded-lg max-w-xs ${
                msg.receiver._id === receiverId._id
                  ? "bg-gray-200 text-black"
                  : "bg-purple-600 text-white"
              }`}
            >
              <p>{msg.sender?.name || "po"}</p>
              <p>{msg.receiver?.name || "po"}</p>
              <p>{msg.message}</p>
              <span className="text-xs text-gray-400 block mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex items-center space-x-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
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
  );
};

export default Chat;
