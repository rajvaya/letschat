import React, { useEffect } from 'react'
import firebase from './../firebase'
import "firebase/database"

const ChatInput = () => {


    // var database = firebase.database();

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

        var MessagesRef = firebase.database().ref('messages');
        var newMessageRef = MessagesRef.push();
        newMessageRef.set({
            sender: "user2",
            message: Text,
            timestamp: time(),
            status: "sent"
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
                className="border-2 border-blue-700 p-2"
            />

            <button className="border-2 border-blue-700 p-2" onClick={
                send
            }>SEND</button>

        </div>
    )
}


export default ChatInput
