import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Componentes/Header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ranking</button>
        </Link>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar Novamente</button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
