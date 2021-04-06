import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Login from './Pages/Login';
import './App.css';
import Settings from './Pages/Settings';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    );
  }
}

export default App;
