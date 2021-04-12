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
    ]
      
    // transforma o array em objeto JSON
    const jsonRankingSet = JSON.stringify(rankingTeste)
      
    // seta o objeto JSON no localStorage
    localStorage.setItem('ranking', jsonRankingSet);

    // recupera o objeto JSON do localStorage
    const jsonRanking = localStorage.getItem('ranking');

    // converte o objeto JSON pra um array
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
