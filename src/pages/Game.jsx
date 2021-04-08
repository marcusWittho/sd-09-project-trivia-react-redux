import React, { Component } from 'react';
import Header from '../components/Header';
import Answers from '../components/Answers';

class Game extends Component {
  render() {
    return (
      <header>
        <h2>Página do jogo</h2>
        <Header />
        <Answers />
      </header>
    );
  }
}

export default Game;
