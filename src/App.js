import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Feedback from './pages/Feedback';
import Home from './pages/Home';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}
