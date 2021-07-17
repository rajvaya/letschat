

import React, { useEffect } from 'react'
import ChatHeader from '../Components/ChatHeader'
import ChatInput from '../Components/ChatInput'
import Messages from '../Components/Messages'
import firebase from "./../firebase"
import "firebase/database"
import { useLocation } from 'react-router-dom'



const ChatBox = ({ }) => {

    const { state } = useLocation();
    const [msgLoaded, setMsgLoader] = React.useState(false);
    const [MessagesList, setMessages] = React.useState([]);
    const [status, setStatus] = React.useState("offline");

    function UpdateUserStatus() {
        var presenceRef = firebase.database().ref(`users/${state.currentUser}`);
        presenceRef.update({
            status: "online",
        });
        presenceRef.onDisconnect().update({
            status: "offline",
        });
        var statusRef = firebase.database().ref(`users/${state.chatWithUser}`);
        statusRef.on("value", (snapshot) => {
            setStatus(snapshot.val().status);
        }
        );
    }





    function UpdateMessageStatus(snapshot) {
        snapshot.forEach(snapshot => {
            if (snapshot.val().sender !== state.currentUser) {
                const snapRef = firebase.database().ref(`chats/${state.chatID}/${snapshot.key}`);
                snapRef.update({
                    status: "seen",
                });

            }
        });
    }

    React.useEffect(() => {
        UpdateUserStatus();
        var MessagesRef = firebase.database().ref(`chats/${state.chatID}`);
        MessagesRef.on("value", (snapshot) => {
            setMessages([]);
            snapshot.forEach(snapshot => {

                if (snapshot.key !== "createdBy") {
                    setMessages((msg) => [...msg, { key: snapshot.key, value: snapshot.val() }]);
                }
            });
            UpdateMessageStatus(snapshot);
        }
        );
        setMsgLoader(true);
    }, []);





    return (
        // <div className="flex flex-row w-screen content-center justify-center">
        <div className="flex flex-col items-center justify-end h-screen ">
            <div className="flex flex-col border-4 max-h-full h-full w-full max-w-sm border-purple-700">

                <ChatHeader chatWithUser={state.chatWithUser} status={status} />
                <Messages MessagesList={MessagesList} msgLoaded={msgLoaded} currentUser={state.currentUser} />
                <ChatInput status={status} currentUser={state.currentUser} chatID={state.chatID} />

            </div>

        </div>
        // </div>
    )
}

export default ChatBox
