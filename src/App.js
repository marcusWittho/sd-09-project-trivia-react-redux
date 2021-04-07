import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Feedback, Home, Gaming, Settings } from './pages';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/gaming" component={ Gaming } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
