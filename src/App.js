import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import logo from './trivia.png';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './components/Feedback';

export default function App() {
  return (
    <main className="App">
      <section className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ Game } />
          <Route path="/settings" component={ Settings } />
          <Route path="/feedback" component={ Feedback } />
        </Switch>
      </section>
    </main>
  );
}
