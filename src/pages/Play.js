import React from 'react';
import Game from '../components/Game';
import Header from '../components/Header';
import '../styles/play.css';

class Play extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Game />
      </div>
    );
  }
}

export default Play;
