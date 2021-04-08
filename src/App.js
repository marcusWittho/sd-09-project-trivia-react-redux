import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
// import Game from './pages/Game';
import GameScreen from './pages/GameScreen';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ GameScreen } />
    </Switch>
  );
}
