import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Settings from './components/Settings';
import Feedback from './components/Feedback';
import GamePlay from './components/GamePlay';
import Ranking from './components/Ranking';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/gameplay" component={ GamePlay } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}

export default App;
