import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Play from './pages/Play';
import Config from './pages/Config';
import FeedBack from './pages/FeedBack';
import Ranking from './pages/Ranking';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/play" component={ Play } />
        <Route path="/config" component={ Config } />
        <Route path="/feedback" component={ FeedBack } />
        <Route path="/ranking" component={ Ranking } />
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
