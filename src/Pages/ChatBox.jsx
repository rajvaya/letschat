

import React, { useEffect } from 'react'
import ChatHeader from '../Components/ChatHeader'
import ChatInput from '../Components/ChatInput'
import Messages from '../Components/Messages'
import firebase from "./../firebase"
import "firebase/database"
import { useLocation } from 'react-router-dom'


const ChatBox = () => {




    const [msgLoaded, setMsgLoader] = React.useState(false);
    const [isChat, setChat] = React.useState(true);
    const [MessagesList, setMessages] = React.useState([]);
    const location = useLocation();




    // useEffect(() => {



    //     MessagesList.forEach(snapshot => {
    //         if (snapshot["value"].sender !== location.pathname.substring(1)) {
    //             const snapRef = firebase.database().ref('messages').child(snapshot.key);
    //             if (snapshot["value"].status === "sent" && isChat) {
    //                 snapRef.update({
    //                     status: "seen",
    //                 });
    //             }

    //             else {
    //                 snapRef.update({
    //                     status: "delivered",
    //                 });
    //             }

    //             if (snapshot["value"].status === "delivered" && isChat) {
    //                 snapRef.update({
    //                     status: "seen",
    //                 });
    //             }

    //         }


    //     })
    // }, [isChat]);



    function UpdateMessageStatus(snapshot) {

        snapshot.forEach(snapshot => {
            if (snapshot.val().sender !== location.pathname.substring(1)) {
                const snapRef = firebase.database().ref('messages').child(snapshot.key);
                if (snapshot.val().status === "sent") {
                    snapRef.update({
                        status: "seen",
                    });

                }

                // else {
                //     snapRef.update({
                //         status: "delivered",
                //     });
                // }

                // if (snapshot.val().status === "delivered" && isChat) {
                //     snapRef.update({
                //         status: "seen",
                //     });
                // }

            }
        });
    }

    React.useEffect(() => {
        var MessagesRef = firebase.database().ref('messages');
        MessagesRef.on("value", (snapshot) => {
            setMessages([]);
            snapshot.forEach(snapshot => {
                setMessages((msg) => [...msg, { key: snapshot.key, value: snapshot.val() }]);
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

                <ChatHeader isChat={isChat} setChat={setChat} />
                {isChat ? <Messages MessagesList={MessagesList} msgLoaded={msgLoaded} /> : <div className="h-full"> </div>}
                <ChatInput />

            </div>

        </div>
        // </div>
    )
}

export default ChatBox
