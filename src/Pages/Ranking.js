import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const { player: { name, gravatarEmail } } = JSON.parse(localStorage.getItem('state'));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <p data-testid="input-player-name">{name}</p>
        <p data-testid="input-gravatar-email">{gravatarEmail}</p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
