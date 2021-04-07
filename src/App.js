import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import GamePage from './pages/GamePage';
import Config from './pages/Config';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ GamePage } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/settings" component={ Config } />
    </Switch>
  );
}
