import React, { Component } from 'react';
import './ranking.css';

class Ranking extends Component {
  render() {
    const jsonRanking = localStorage.getItem('ranking');
    const ranking = JSON.parse(jsonRanking);

    return (
      <div className="card-container">
        <h2>Ranking</h2>
        <ul className="ranking-list">
          <li>
            <div>
              <div data-testid={ `player-name-0` }>
                <span className="ranking-text">Nome: </span>
                Stephen Hawking
              </div>
              <div data-testid={ `player-score-0` }>
                <span className="ranking-text">Score: </span>
                3
              </div>
            </div>
          </li>
          {
            ranking.sort((play1, play2) => play2.score - play1.score)
              .map((jogada, index) => (
                <li key={ jogada.name } className="ranking-item">
                  <div>
                    <div data-testid={ `player-name-${index + 1}` }>
                      <span className="ranking-text">Nome: </span>
                      { jogada.name }
                    </div>
                    <div data-testid={ `player-score-${index + 1}` }>
                      <span className="ranking-text">Score: </span>
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
