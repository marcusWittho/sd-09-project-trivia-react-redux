import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={ Login } />
    </Switch>
  );
}
