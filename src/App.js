import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import Login from './pages/login';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header>
      <body>
        <Switch>
          <Route exact path="/"><Login /></Route>
          {/* <Route path="tela-do-jogo" component={ nomeDoCompomente } /> */}
          {/* <Route path="configuracao" component={ nomeDoCompomente } /> */}
        </Switch>
      </body>
    </div>
  );
}
