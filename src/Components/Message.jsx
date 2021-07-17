import React from "react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

const Message = ({ currentUser , msg }) => {
    const location = useLocation();

    console.log(msg);

    function getColor() {
        return (currentUser === msg.sender)
            ? "border-green-500"
            : "border-pink-500";
    }

    function timeStampToDate(timestamp) {
        var date = new Date(timestamp);

        return " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    return (
        <div
            className={classNames(
                "flex flex-col m-2 border-4 rounded-xl p-2  whitespace-pre-wrap wrap break-words",
                getColor()
            )}
        >
            <p> {msg.message} </p>
            <div className="flex flex-row justify-between">

                <p> time : {timeStampToDate(msg.timestamp)} </p>

                {currentUser === msg.sender ? (
                    <p className="text-right"> {msg.status} </p>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Message;
