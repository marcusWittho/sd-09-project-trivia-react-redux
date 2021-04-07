import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Game from './components/Game';

export default function App() {
  return (
    <BrowserRouter>
      <p>SUA VEZ</p>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
      </Switch>
    </BrowserRouter>
  );
}
