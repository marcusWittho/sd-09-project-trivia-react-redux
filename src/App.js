import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginScreen from './pages/login';
import Trivia from './pages/trivia';
import Settings from './pages/settings';
import Feedback from './pages/feedback';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/"><LoginScreen /></Route>
      <Route path="/trivia" component={ Trivia } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}
