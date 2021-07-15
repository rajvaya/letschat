import React from 'react'
import classNames from "classnames"
import { useLocation } from 'react-router-dom'




const Message = ({ msg }) => {


    const location = useLocation();


    function getColor() {


        return location.pathname.substring(1) === msg.sender ? "border-green-500" : "border-pink-500";
    };

    return (
        <div className={classNames("flex flex-col m-2 border-4 rounded-xl p-2  whitespace-pre-wrap wrap break-words", getColor())}>

            <p>  {msg.message} </p>
            {
                location.pathname.substring(1) === msg.sender ?
                    <p className="text-right">  {msg.status} </p> :
                    <></>

            }

        </div>
    )
}

export default Message
