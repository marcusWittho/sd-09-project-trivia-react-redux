import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ScreenGame from './pages/ScreenGame';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/screen-game" component={ ScreenGame } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
