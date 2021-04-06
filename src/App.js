import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Play from './pages/Play';
import Settings from './pages/Settings';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/play" component={ Play } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    );
  }
}

export default App;
