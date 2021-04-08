import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import GamePage from './pages/GamePage';
import Config from './pages/Config';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ GamePage } />
      <Route path="/settings" component={ Config } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
