import React, { useEffect, useState } from 'react'
import 'firebase/database';
import firebase from "../firebase"
import { useHistory, useParams } from 'react-router-dom'


const Users = () => {

    let { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();



    useEffect(() => {

        CheckUserExist()

    }, []);


    function CheckUserExist() {
        var usersRef = firebase.database().ref(`users/${id}`);
        usersRef.on("value",
            (snapshot) => {
                console.log(snapshot);
                if (snapshot.val() !== null) setLoading(false);
                else {
                    history.push("/");
                }

            }
        );
    }



    return (
        <>
            {isLoading ? <div> Loading.......... </div > : <div>Loaded</div>}

        </>
    )
}

export default Users
