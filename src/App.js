import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Settings from './Pages/Settings';
import Login from './Pages/Login';
import GameScreen from './Pages/GameScreen';
import Feedback from './Pages/Feedback';
import Ranking from './Pages/Ranking';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route path="/trivia" component={ GameScreen } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}

export default App;
