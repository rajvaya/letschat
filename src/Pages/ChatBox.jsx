

import React from 'react'
import ChatHeader from '../Components/ChatHeader'
import ChatInput from '../Components/ChatInput'
import Messages from '../Components/Messages'
import firebase from "./../firebase"
import "firebase/database"
import { useLocation } from 'react-router-dom'


const ChatBox = () => {




    const [msgLoaded, setMsgLoader] = React.useState(false);
    const [MessagesList, setMessages] = React.useState([]);
    const location = useLocation();



    function UpdateSeen(snapshot) {



        snapshot.forEach(snapshot => {



            if (snapshot.val().sender !== location.pathname.substring(1)) {

                const snapRef = firebase.database().ref('messages').child(snapshot.key);
                snapRef.update({
                    status: "seen",
                });


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
            UpdateSeen(snapshot);
        }
        );
        setMsgLoader(true);


    }, []);





    return (
        // <div className="flex flex-row w-screen content-center justify-center">
        <div className="flex flex-col items-center max-h-screen h-screen ">
            <div className="flex flex-col border-4 h-full w-full max-w-sm border-purple-700">

                <ChatHeader />
                <Messages MessagesList={MessagesList} msgLoaded={msgLoaded} />
                <ChatInput />
            </div>

        </div>
        // </div>
    )
}

export default ChatBox
