import { createContext, useState, useContext } from "react";

const ChatContext = createContext();

const Context = ({ children }) => {
    const [messages, setMessages] = useState([]);

    return (
        <ChatContext.Provider value={{ messages, setMessages }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
export default Context;
