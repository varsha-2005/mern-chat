import { useState } from "react";
import Member from './Member';
import Chat from './Chat';

const Main = () => {
    const [receiverId, setReceiverId] = useState<string | null>(null);

    return (
        <div className='flex w-full gap-7'>
            <div>
                <Member setReceiverId={setReceiverId} />
            </div>
            <div className='flex w-full'>
                {receiverId ? <Chat receiverId={receiverId} /> : <div>Select a user to start chatting</div>}
            </div>
        </div>
    );
};

export default Main;
