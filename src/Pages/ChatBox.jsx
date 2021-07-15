

import React from 'react'
import ChatHeader from '../Components/ChatHeader'
import ChatInput from '../Components/ChatInput'
import Messages from '../Components/Messages'

const ChatBox = () => {
    return (
        // <div className="flex flex-row w-screen content-center justify-center">
        <div className="flex flex-col items-center max-h-screen h-screen ">
            <div className="flex flex-col border-4 h-full max-w-2xl border-purple-700">

                <ChatHeader />
                <Messages />
                <ChatInput />
            </div>

        </div>
        // </div>
    )
}

export default ChatBox
