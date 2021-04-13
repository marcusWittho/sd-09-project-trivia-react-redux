import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Questions from './pages/Questions';
import GameSettings from './pages/GameSettings';
import Feedback from './pages/Feedback';
import Rank from './pages/Rank';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/trivia" component={ Questions } />
          <Route path="/settings" component={ GameSettings } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/ranking" component={ Rank } />
        </Switch>
      </div>
    );
  }
}
