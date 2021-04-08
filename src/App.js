import React from 'react';
import Login from './pages/Login';
import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">
          <img src={ logo } className="App-logo" alt="logo" />
        </div>
        <Login />
      </header>
      <p className="msg">SUA VEZ</p>
    </div>
  );
}
