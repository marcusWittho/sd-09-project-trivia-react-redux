import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Settings from './pages/settings';
import Login from './pages/login';
import Game from './pages/game';
import Ranking from './pages/ranking';
import Feedback from './pages/feedback';

import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
      <Route path="/game" component={ Game } />
      <Route path="/ranking" component={ Ranking } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}
