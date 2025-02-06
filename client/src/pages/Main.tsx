import Member from './Member'
import Chat from './Chat'

const Main = () => {
    return (
        <div className='flex w-full gap-7'>
            <div>
                <Member users={[]} />
            </div>
            <div className='flex w-full'>
                <Chat />
            </div>
        </div>
    )
}

export default Main;
