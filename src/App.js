import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import TriviaPage from './pages/TriviaPage';
import Configuration from './pages/Configuration';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/trivia" component={ TriviaPage } />
        <Route path="/config" component={ Configuration } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}
