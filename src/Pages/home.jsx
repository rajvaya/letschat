import React from "react";
import { useHistory } from "react-router-dom";
import 'firebase/database';
import firebase from "../firebase"

const home = () => {

  const history = useHistory();

  const [Text, setText] = React.useState("");
  const textHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setText(e.target.value);
  };

  function CreateUser() {

    var userRef = firebase.database().ref(`users/${Text}`);
    userRef.once("value", async (snapshot) => {
      console.log(snapshot.val());
      if (snapshot.val() !== null) {
        console.log("user Already Exists");

      }
      else {
        var usersRef = firebase.database().ref('users');
        var newuser = usersRef.child(Text);
        await newuser.set({
          name: Text,
          status: "offline",
        });
      }
      history.push(`users/${Text}`);
    });





  }


  return (
    <div className="max-h-screen h-screen w-screen bg-gray-200">
      <div className="flex flex-col content-center justify-center items-center pt-8">
        <p className="text-4xl">Hello Lets chat</p>
        <p className="text-xl mt-8">Enter Your Name To Join or Login Again to Chats</p>

        <div className="flex flex-row mt-8">

          <input
            type="text"
            name="tweeturl/id"
            value={Text}
            onChange={textHandler}
            placeholder="Enter Your Name"
            autoCapitalize="none"
            className="border-2 border-blue-700 p-2 flex-1"
          />

          <button className="border-2 border-blue-700 p-2" onClick={
            CreateUser
          }>Add</button>

        </div>


      </div>
    </div>
  );
};

export default home;
