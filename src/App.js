import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Settings, Trivia, Feedback, Ranking } from './pages';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route path="/trivia" component={ Trivia } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}
