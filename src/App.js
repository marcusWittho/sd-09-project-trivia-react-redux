import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './Pages/Login';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/"><Login /></Route>
      </Switch>
    </div>
  );
}
