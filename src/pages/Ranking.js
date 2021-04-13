import React, { Component } from 'react';
import './ranking.css';

class Ranking extends Component {
  constructor() {
    super();

    this.saveRankingOnStorage = this.saveRankingOnStorage.bind(this);
  }

  componentDidMount() {
    this.saveRankingOnStorage();
  }

  saveRankingOnStorage() {
    const firstPlayers = [
      {
        name: 'João das Couves',
        score: 7,
        picture: 'https://pbs.twimg.com/profile_images/2832206884/ddc249b8571c57baba13c5847a0cdd4c_400x400.jpeg',
      },
      {
        name: 'Stephen Hawking',
        score: 10,
        picture: 'https://i.pinimg.com/564x/3b/d8/8d/3bd88d1e67ba8e55c4a8a57b019983b6.jpg',
      },
    ];
    localStorage.setItem('ranking', JSON.stringify(firstPlayers));
  }

  render() {
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
                  <img
                    src={ jogada.picture }
                    alt="foto do jogador"
                    className="profile-picture"
                  />
                </li>))
          }
        </ul>
      </div>
    );
  }
}

export default Ranking;
