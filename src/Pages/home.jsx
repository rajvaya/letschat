import React from "react";

const home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Lets chat</p>

        <p>
          <a className="App-link" href="/user1">
            User 1
          </a>
          {" | "}
          <a className="App-link" href="user2">
            User 2
          </a>
        </p>
      </header>
    </div>
  );
};

export default home;
