import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import GamePage from './pages/GamePage';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ GamePage } />
      </Switch>
    );
  }
}
export default App;
