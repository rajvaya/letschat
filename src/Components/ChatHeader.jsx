import React from 'react'
import { useLocation } from 'react-router-dom'



const ChatHeader = () => {

    const location = useLocation();

    return (
        <div className="w-full flex flex-row gap-2 p-4 border-green-300 border-2">

            <p>{location.pathname === "/user1" ? "User 2" : "User 1"}</p>

            <p>Status Online</p>

        </div>
    )
}

export default ChatHeader
