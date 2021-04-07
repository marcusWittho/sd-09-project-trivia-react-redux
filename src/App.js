import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Trivia from './Pages/Trivia';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />              
        <Route exact path="/home" component={ Home } />
        <Route exact path="/trivia" component={ Trivia } />
      </Switch>
    );
  }
}

export default App;
