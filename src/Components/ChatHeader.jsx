import React from 'react'
import { useLocation } from 'react-router-dom'
import firebase from './../firebase';
import "firebase/database"


const ChatHeader = ({ isChat, setChat }) => {

    const location = useLocation();

    const [status, setStatus] = React.useState("offline");
    React.useEffect(() => {
        var presenceRef = firebase.database().ref(location.pathname.substring(1));
        presenceRef.set("online");
        presenceRef.onDisconnect().set("offline")
        var statusRef = firebase.database().ref(location.pathname.substring(1) === "user1" ? "user2" : "user1");
        statusRef.on("value", (snapshot) => {
            setStatus(snapshot.val());
        }
        );

    });

    return (
        <div className="w-full flex flex-row justify-between content-center m-0  px-4 border-green-300 border-2">

            <p className="self-center">{location.pathname === "/user1" ? "User 2 - " : "User 1 - "} {status}</p>
            <button className="p-2 m-0 border-indigo-900 border-2" onClick={() => {


                setChat(!isChat);

            }}> {isChat ? "Hide " : "Show "}Chat</button>

        </div >
    )
}

export default ChatHeader
