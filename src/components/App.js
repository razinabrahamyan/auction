import React from "react"
import Signup from "./Signup"
import List from "./List"
import Add from "./Add"
import Show from "./Show"

import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Login"


function App() {
  return (


        <Router>
          <AuthProvider>
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/add" component={Add} />
                <Route path="/show/:id" component={Show} />
                <Route path="/login" component={Login} />
                <Route path="/" component={List} />
            </Switch>
          </AuthProvider>
        </Router>

  )
}

export default App
