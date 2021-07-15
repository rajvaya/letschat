import React, { useEffect } from 'react'
import firebase from './../firebase';
import "firebase/database"
import Message from './Message';

const Messages = () => {



    const [msgLoaded, setMsgLoader] = React.useState(false);
    const [Messages, setMessages] = React.useState([]);


    useEffect(() => {

        getMessages();

    }, []);





    function getMessages() {
        var MessagesRef = firebase.database().ref('messages');
        MessagesRef.on("child_added", (snapshot) => {
            console.log(snapshot.val());
            setMessages((msg) => [...msg, snapshot.val()]);
        }


        );
        setMsgLoader(true);
    }



    return (
        <div className="flex flex-col flex-1 overflow-y-scroll ">


            {

                (msgLoaded) ? <div>

                    {
                        Messages.map(msg => (
                            <Message msg={msg} />
                        ))

                    }


                </div> : <div> Message Loading</div>

            }



        </div>
    )
}

export default Messages
