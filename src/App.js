import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={ Login } />
    </Switch>
  );
}
