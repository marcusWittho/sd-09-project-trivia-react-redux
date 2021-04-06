import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/game" component={ Game } />
        <Route path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
