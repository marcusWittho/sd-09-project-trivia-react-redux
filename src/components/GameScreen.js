import React from 'react';
import Game from './Game';
import Header from './Header';

class GameScreen extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Game />
      </div>
    );
  }
}

export default GameScreen;
