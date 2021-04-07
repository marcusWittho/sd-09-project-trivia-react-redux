import React from 'react';
import logo from './trivia.png';
import Login from './pages/login';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
          <Login />
        </p>
      </header>
    </div>
  );
}
