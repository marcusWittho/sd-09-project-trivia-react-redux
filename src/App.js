import React from 'react';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Route } from 'react-router-dom';
import Settings from './pages/Settings';

export default function App() {
  return (
    <main className="App">
      <section className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <BrowserRouter>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
        </BrowserRouter>
      </section>
    </main>

  );
}
