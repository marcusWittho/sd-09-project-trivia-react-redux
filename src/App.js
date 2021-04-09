import React from 'react';
import { Route, Switch } from 'react-router';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';
// import logo from './trivia.png';
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
