import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import GameScreen from './components/GameScreen';
import Login from './components/Login';
import Settings from './pages/settings';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
      <Route path="/:page" component={ GameScreen } />
    </Switch>
  );
}

export default App;
