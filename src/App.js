import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Config from './pages/Config';
import Home from './pages/Home';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/settings" component={ Config } />
    </Switch>
  )
}
