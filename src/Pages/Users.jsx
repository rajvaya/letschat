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
                if (snapshot.val().name !== id) {
                    setUsers((msg) => [...msg, snapshot.val()]);
                }
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
                                <p>{`${user.name} is ${user.status}`}</p>
                            ))

                        }

                    </div>
                </div>
            )}
        </>
    );
};

export default Users;
