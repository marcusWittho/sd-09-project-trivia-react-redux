import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route path="/settings" component={ Settings } />
      <Route path="/game" component="" />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
