import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Play from './pages/Play';
import Config from './pages/Config';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/play" component={ Play } />
        <Route path="/config" component={ Config } />
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
