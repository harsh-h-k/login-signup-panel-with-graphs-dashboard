import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';

import Login from './components/Login';
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="App">
         <Router>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route path="/dashboard" component={Dashboard}/>
    </Router>
    </div>
  );
}

export default App;
