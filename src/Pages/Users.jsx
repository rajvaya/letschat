import React, { useEffect, useState } from "react";
import "firebase/database";
import firebase from "../firebase";
import { useHistory, useParams } from "react-router-dom";

const Users = () => {
    let { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();
    const [usersList, setUsers] = React.useState([]);


    useEffect(() => {
        CheckUserExist();
    }, []);




    function OpenChat(chatwith) {
        let currentUser = usersList.find(user => user.value.name === id);
        console.log("Current User", currentUser);
        if (currentUser.value.users) {
            console.log("Users");

            if (currentUser.value.users[chatwith]) {
                console.log("Chat id Exist");

                // Push to Chat with parameter ID
            }

            else {
                console.log("New Chat");
                var chatsRef = firebase.database().ref('chats');
                var CurrentUserRef = firebase.database().ref(`users/${currentUser.value.name}/users/`);
                var ChatWithUserRef = firebase.database().ref(`users/${chatwith}/users/`);
                var newChatRef = chatsRef.push();
                console.log(newChatRef.key);
                newChatRef.set({
                    createdBy: id,
                });

                var CUR = CurrentUserRef.child(chatwith);
                var CWR = ChatWithUserRef.child(currentUser.value.name);
                CUR.set(newChatRef.key);
                CWR.set(newChatRef.key);



            }

        }


        else {

            console.log("New Chat without Users");
            var chatsRef = firebase.database().ref('chats');
            var CurrentUserRef = firebase.database().ref(`users/${currentUser.value.name}/users/`);
            var ChatWithUserRef = firebase.database().ref(`users/${chatwith}/users/`);
            var newChatRef = chatsRef.push();
            console.log(newChatRef.key);
            newChatRef.set({
                createdBy: id,
            });

            var CUR = CurrentUserRef.child(chatwith);
            var CWR = ChatWithUserRef.child(currentUser.value.name);
            CUR.set(newChatRef.key);
            CWR.set(newChatRef.key);
        }


    }

    function UpdateUserStatus() {
        var presenceRef = firebase.database().ref(`users/${id}`);
        presenceRef.update({
            status: "online",
        });
        presenceRef.onDisconnect().update({
            status: "offline",
        });
    }







    function getUsers() {
        var usersRef = firebase.database().ref('users');
        usersRef.on("value", (snapshot) => {
            setUsers([]);
            snapshot.forEach(snapshot => {
                setUsers((msg) => [...msg, { key: snapshot.key, value: snapshot.val() }]);
            });
        }
        );


    }

    function CheckUserExist() {
        var usersRef = firebase.database().ref(`users/${id}`);
        usersRef.on("value", (snapshot) => {
            console.log(snapshot);
            if (snapshot.val() !== null) {
                setLoading(false);
                UpdateUserStatus();
                getUsers();

            }
            else {
                history.push("/");

            }
        });


    }

    return (
        <>
            {isLoading ? (
                <div> Loading.......... </div>
            ) : (
                <div className="flex flex-col items-center justify-end h-screen ">
                    <div className="flex flex-col border-4 max-h-full h-full w-full max-w-sm border-purple-700">

                        <p className="text-center text-xl py-4 border-b-4 border-purple-700">Welcome {id}</p>

                        {
                            usersList.map(user => (
                                (user.value.name !== id) ? <p>{`${user.value.name} is ${user.value.status}`}</p> : <></>
                            ))

                        }

                        <button onClick={() => { OpenChat("XYZ") }}>Click</button>

                    </div>
                </div>
            )}
        </>
    );
};

export default Users;
