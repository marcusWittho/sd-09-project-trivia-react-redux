import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game/Game';
import Config from './pages/Config';
import Rankings from './pages/Rankings';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Switch>
            <Route path="/triviaGame">
              <Game />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/Config">
              <Config />
            </Route>
            <Route path="/Rankings">
              <Rankings />
            </Route>
          </Switch>
        </header>
      </div>
    );
  }
}

export default App;
