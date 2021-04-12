import React, { Component } from 'react';
import './ranking.css';

class Ranking extends Component {
  render() {
    const rankingTeste = [
      {
        name: 'Godoffredo',
        score: 2,
        picture: 'https://www.gravatar.com/avatar/8d7e21d751e2e1c783c16d3ce048757c',
      },
      {
        name: 'Chiffronezio',
        score: 5,
        picture: 'https://www.gravatar.com/avatar/8d7e21d751e2e1c783c16d3ce048757c',
      },
    ];
    const jsonRankingSet = JSON.stringify(rankingTeste);
    localStorage.setItem('ranking', jsonRankingSet);
    const jsonRanking = localStorage.getItem('ranking');
    const ranking = JSON.parse(jsonRanking);

    return (
      <div className="card-container">
        <h2>Ranking</h2>
        <ul className="ranking-list">
          {
            ranking.sort((play1, play2) => play2.score - play1.score)
              .map((jogada, index) => (
                <li key={ jogada.name } className="ranking-item">
                  <div>
                    <div data-testid={ `player-name-${index}` }>
                      <span className="ranking-text">Nome: </span>
                      { jogada.name }
                    </div>
                    <div data-testid={ `player-score-${index}` }>
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
