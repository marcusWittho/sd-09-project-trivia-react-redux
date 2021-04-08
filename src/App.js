import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SettingsPage from './pages/Settings';
import FeedbackPage from './pages/FeedbackPage';
import LoginPage from './components/Login';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={ LoginPage }/>
      <Route path="/main-page" component={ MainPage } />
      <Route path="/settings" component={ SettingsPage } />
      <Route path="/feedback" component={ FeedbackPage } />
    </Switch>
  );
}
