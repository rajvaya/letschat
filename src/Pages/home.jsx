import React from "react";

const home = () => {
  return (
    <div className="max-h-screen h-screen w-screen bg-gray-200">
      <div className="flex flex-col content-center justify-center items-center">
        <p className="text-4xl">Hello Lets chat</p>

        <p>
          <a className="text-blue-800 text-lg" href="/user1">
            User 1
          </a>
          {" | "}
          <a className="text-blue-800 text-lg" href="user2">
            User 2
          </a>
        </p>
      </div>
    </div>
  );
};

export default home;
