import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
          <Router>
            <Route exact path="/" component={ Login } />
          </Router>
        </p>
      </header>
    </div>
  );
}
