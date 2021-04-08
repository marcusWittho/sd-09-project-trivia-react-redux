import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from './Game';
import Ranking from './Ranking';
import Feedback from './Feedback';
import Header from './Header';

class GameScreen extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/game" component={ Game } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/ranking" component={ Ranking } />
        </Switch>
      </div>
    );
  }
}

export default GameScreen;
