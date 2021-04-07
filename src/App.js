import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import logo from './trivia.png';
import './App.css';
import Game from './pages/Game';

export default function App() {
  return (
    <main className="App">
      <section className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <BrowserRouter>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
          <Route path="/game" component={ Game } />
        </BrowserRouter>
      </section>
    </main>

  );
}
