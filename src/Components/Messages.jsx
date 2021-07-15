import React, { useEffect } from 'react'
import firebase from './../firebase';
import "firebase/database"

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
            setMessages((msg) => [...msg , snapshot.val()]);
        }


        );


        // console.log()

        // console.log(Messages.length);
        setMsgLoader(true);
    }



    return (
        <div className="flex flex-1">


            {

                (msgLoaded) ? <div>

                    {
                        Messages.map(msg => (
                            <p>{msg.message}</p>
                        ))

                    }


                </div> : <div> Message Loading</div>

            }



        </div>
    )
}

export default Messages
