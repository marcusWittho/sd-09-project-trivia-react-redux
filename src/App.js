import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
// import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route path="/settings" component={ Settings } />
      <Route path="/game" component={ Game } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
