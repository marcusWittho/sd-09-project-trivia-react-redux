import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './Pages/Login';
import Settings from './Pages/Settings';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/"><Login /></Route>
        <Route path="/settings"><Settings /></Route>
        <Route path="/dummy" />
      </Switch>
    </div>
  );
}
