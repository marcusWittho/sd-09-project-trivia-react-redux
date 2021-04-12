import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import InfoGames from './Pages/InfoGames';
import Login from './Pages/Login';
import Settings from './Pages/Settings';
import Ranking from './Pages/Ranking';
import Feedback from './Pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/"><Login /></Route>
        <Route path="/settings"><Settings /></Route>
        <Route path="/info-games"><InfoGames /></Route>
        <Route path="/Ranking"><Ranking /></Route>
        <Route path="/Feedback"><Feedback /></Route>
      </Switch>
    </div>
  );
}
