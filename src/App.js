import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import { Login, GamePage, RankingPage, feedbackPage, Settings } from './pages';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header> */}
      <Switch>
        <Route path="/game-page" component={ GamePage } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ feedbackPage } />
        <Route exact path="/" component={ Login } />
        <Route path="/ranking" component={ RankingPage } />
      </Switch>
    </div>
  );
}
