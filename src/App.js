import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Settings from './components/Settings';
import Feedback from './components/Feedback';
import './App.css';
import GamePlay from './components/GamePlay';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/gameplay" component={ GamePlay } />
      </Switch>
    );
  }
}

export default App;
