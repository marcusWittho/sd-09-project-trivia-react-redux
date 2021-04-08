import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Settings from './components/Settings';
import './App.css';
import GamePlay from './components/GamePlay.js';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route path="/gameplay" component={ GamePlay } />
      </Switch>
    );
  }
}

export default App;
