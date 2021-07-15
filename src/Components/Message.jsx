import React from 'react'

const Message = ({ msg }) => {
    return (
        <div className="m-2 border-2 rounded-xl p-2 border-yellow-200 whitespace-pre-wrap wrap break-words">

            {msg.message}

        </div>
    )
}

export default Message
