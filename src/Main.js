import React from 'react'
import { Switch, Route } from "react-router-dom"
import Home from './Home';

function Main(props) {
  return (
    <div>
      {props.loggedIn
        ?
        <div>
          Navbar
          <h2>Logged In</h2>
        </div>
        :
        <div>
          <Home />
        </div>
      }
    </div>
  )
}

export default Main
