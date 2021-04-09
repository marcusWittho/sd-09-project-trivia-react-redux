import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Game from './pages/Game/Game';
import Settings from './pages/Settings';
import MainContainer from './components/Layout/styled';
import Layout from './components/Layout/Layout';

const App = () => (
  <MainContainer>
    <Layout>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </Layout>
  </MainContainer>
);

export default App;
