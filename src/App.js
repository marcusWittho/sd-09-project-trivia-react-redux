import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/jogo" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}
