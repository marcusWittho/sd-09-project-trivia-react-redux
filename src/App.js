import React from 'react';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';

export default function App() {
  return (
    <main className="App">
      <section className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Login />
      </section>
    </main>

  );
}
