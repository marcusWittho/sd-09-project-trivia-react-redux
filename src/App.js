import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Trivia from './Pages/Trivia';


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/trivia" component={ Home } />
        <Route path="/settings" component={ Trivia } />
      </Switch>
    );
  }
}

export default App;
