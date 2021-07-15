import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import fb from 'firebase/app';
import 'firebase/database';
import config from "./config"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Home from './Pages/home';

function App() {
  let firebase;
  let dbRef;

  useEffect(() => {
    firebase = fb.initializeApp(config);
  }, []);




  return (

    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>

    </Router>
  )
}

export default App
