import React, { useEffect } from 'react'
import firebase from './../firebase'
import "firebase/database"
import { useLocation } from 'react-router-dom'


const ChatInput = ({ currentUser, status, chatID }) => {
    const [Text, setText] = React.useState("");
    const textHandler = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setText(e.target.value);
    };


    var time = Date.now || function () {
        return +new Date;
    };

    function send() {

        var MessagesRef = firebase.database().ref(`chats/${chatID}`);
        var newMessageRef = MessagesRef.push();
        newMessageRef.set({
            sender: currentUser,
            message: Text,
            timestamp: time(),
            status: (status === "offline") ? "sent" : "delivered",
        });
        setText("");
    }


    return (
        <div className="flex flex-row">

            <input
                type="text"
                name="tweeturl/id"
                value={Text}
                onChange={textHandler}
                placeholder="Write your Message"
                autoCapitalize="none"
                className="border-2 border-blue-700 p-2 flex-1"
            />

            <button className="border-2 border-blue-700 p-2" onClick={
                send
            }>SEND</button>

        </div>
    )
}


export default ChatInput
