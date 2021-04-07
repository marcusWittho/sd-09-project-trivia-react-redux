import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import TriviaPage from './pages/TriviaPage';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/trivia" component={ TriviaPage } />
      </Switch>
    );
  }
}
