import React, { useEffect, useState } from 'react'
import './App.css'
import 'firebase/database';


import config from "./config"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import Home from './Pages/home';
import ChatBox from './Pages/ChatBox';

function App() {



  useEffect(() => {
    // fb.initializeApp(config);
  }, []);

  return (

    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/user1" exact>
          <ChatBox />
        </Route>
        <Route path="/user2" exact>
          <ChatBox />
        </Route>
        <Redirect path="*" to="/" />
      </Switch>

    </Router>
  )
}

export default App
