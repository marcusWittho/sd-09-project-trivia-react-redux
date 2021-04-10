import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import { updateTimerAction } from './actions';

class App extends React.Component {
  componentDidMount() {
    const { updateTimer } = this.props;

    setInterval(() => {
      updateTimer();
    }, 1000);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route path="/game" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateTimer: () => dispatch(updateTimerAction()),
});

export default connect(null, mapDispatchToProps)(App);
