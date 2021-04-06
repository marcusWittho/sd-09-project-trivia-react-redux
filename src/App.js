import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Trivia from './pages/Home';

class App extends Component{
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/home" component={ Home } />
        <Route exact path="/trivia" component={ Trivia } />
      </Switch>
    );
  }
}
