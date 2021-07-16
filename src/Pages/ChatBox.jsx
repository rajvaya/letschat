

import React from 'react'
import ChatHeader from '../Components/ChatHeader'
import ChatInput from '../Components/ChatInput'
import Messages from '../Components/Messages'
import firebase from "./../firebase"
import "firebase/database"

const ChatBox = () => {



    const [msgLoaded, setMsgLoader] = React.useState(false);
    const [MessagesList, setMessages] = React.useState([]);



    // var ref = firebase.database().ref('messages');
    // ref.on("child_changed", (snapshot) => {
    //     console.log(snapshot.val());
    //     setMessages((msg) => [


    //         ...msg, snapshot.val()]);
    //     console.log(Messages.length)
    // }
    // );


    React.useEffect(() => {
        var MessagesRef = firebase.database().ref('messages');
        MessagesRef.once("value", (snapshot) => {
            snapshot.forEach(snapshot => {
                // console.log(snapshot.val());
                // console.log(snapshot.key);
                setMessages((msg) => [...msg, { key: snapshot.key, value: snapshot.val() }]);
            });
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
