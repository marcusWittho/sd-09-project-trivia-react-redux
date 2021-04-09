import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Answers from '../../components/Answers';
import './game.css';
// import Timer from '../../components/Timer';

class Game extends Component {
  render() {
    return (
      <header>
        <h2>Página do jogo</h2>
        {/* <Timer /> */}
        <Header />
        <Answers />

        <Link to="/">
          <button type="button" data-testid="btn-go-home">Tela Inicial</button>
        </Link>
      </header>
    );
  }
}

export default Game;
