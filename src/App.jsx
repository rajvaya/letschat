import React, { useEffect, useState } from 'react'
import './App.css'
import Users from './Pages/Users';
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
  }, []);

  return (

    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/users/:id">
          <Users />
        </Route>
        <Redirect path="*" to="/" />
      </Switch>

    </Router>
  )
}

export default App
