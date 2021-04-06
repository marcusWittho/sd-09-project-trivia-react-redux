import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
// import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ Login } />
      </Switch>
    </BrowserRouter>

  );
}
