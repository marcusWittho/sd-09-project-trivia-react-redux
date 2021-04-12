import React, { Component } from 'react';
import './ranking.css';

class Ranking extends Component {
  render() {
    // recupera o objeto JSON do localStorage
    const jsonState = localStorage.getItem('state');

    // converte o objeto JSON pra um array
    const { ranking } = JSON.parse(jsonState);

    return (
      <div className="card-container">
        <h2>Ranking</h2>
        <ul className="ranking-list">
          {
            ranking.sort((play1, play2) => play1.score < play2.score ? play2 : play1)
              .map((jogada, index) => (
                <li key={ jogada.name } className="ranking-item">
                  <div>
                    <div data-testid={ `player-name-${index}` }>
                      <span className="ranking-text">Nome:</span>
                      { jogada.name }
                    </div>
                    <div data-testid={ `player-score-${index}` }>
                      <span className="ranking-text">Score:</span>
                      { jogada.score }
                    </div>
                  </div>
                  <img src={ jogada.picture } alt="foto do jogador" />
                </li>))
          }
        </ul>
      </div>
    );
  }
}

export default Ranking;
