import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Settings from './pages/Settings/Settings';
import Game from './pages/Game/Game';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
      <Route path="/game" component={ Game } />
    </Switch>
  );
}
