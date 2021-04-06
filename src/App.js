import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './Pages/Login';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
