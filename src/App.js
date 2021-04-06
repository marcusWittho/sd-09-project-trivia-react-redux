import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import GamePage from './pages/GamePage';
import Config from './pages/Config';

export default function App() {
  return (
    <Switch>
      <Route path="/game" component={ GamePage } />
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Config } />
    </Switch>
  );
}
