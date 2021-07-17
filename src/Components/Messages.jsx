import React, { useEffect } from 'react'
import firebase from './../firebase';
import "firebase/database"
import Message from './Message';


const Messages = ({ MessagesList , msgLoaded , currentUser}) => {

    return (
        <div className="flex flex-col flex-1 overflow-y-scroll ">


            {

                (msgLoaded) ? <div>
                    {
                        MessagesList.map(msg => (
                            <Message msg={msg.value} key={ msg.key} currentUser={currentUser}/>
                        ))

                    }


                </div> : <div> Message Loading</div>

            }



        </div>
    )
}

export default Messages
