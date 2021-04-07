import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Settings from './components/Settings';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    );
  }
}

export default App;
