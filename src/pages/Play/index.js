import React from 'react';
import Game from '../../components/Game';
import Header from '../../components/Header';
import './styles.css';

class Play extends React.Component {
  render() {
    return (
      <div className="container-page-play">
        <Header />
        <Game />
      </div>
    );
  }
}

export default Play;
