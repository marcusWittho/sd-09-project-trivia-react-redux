import React, { Component } from 'react';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.createRanking = this.createRanking.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
    this.getRankingLocalStorage = this.getRankingLocalStorage.bind(this);
    this.saveRankingLocalStorage = this.saveRankingLocalStorage.bind(this);

    this.state = {
      ranking: [],
      playerRanking: {
        name: '',
        score: 0,
        picture: '',
      },
    };
  }

  componentDidMount() {
    this.getRankingLocalStorage();
    this.getPlayer();
  }

  getPlayer() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    this.setState({
      playerRanking: {
        name: player.name,
        score: player.score,
        picture: player.gravatarEmail,
      },
    }, () => this.createRanking());
  }

  getRankingLocalStorage() {
    let ranking = JSON.parse(localStorage.getItem('ranking'));
    if (!ranking) {
      localStorage.setItem('ranking', JSON.stringify([]));
      ranking = JSON.parse(localStorage.getItem('ranking'));
    }
    this.setState({
      ranking,
    });
  }

  saveRankingLocalStorage(ranking) {
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  createRanking() {
    const { ranking, playerRanking } = this.state;
    const newRanking = [...ranking, playerRanking];
    const rankingSort = newRanking.sort((x, y) => y.score - x.score);
    this.setState({
      ranking: rankingSort,
    }, () => this.saveRankingLocalStorage(rankingSort));
  }

  render() {
    const { ranking } = this.state;
    const rankingList = ranking
      .map((gamer, index) => (
        <li key="index">
          <img src={ gamer.picture } alt="Imagem do Jogador" />
          <h3 data-testid={ `player-name${index}` }>{ gamer.name }</h3>
          <p data-testid={ `player-score-${index}` }>{ gamer.score }</p>
        </li>
      ));
    return (
      <section data-testid="ranking-title">
        <h1>Ranking</h1>
        <ul>
          { rankingList }
        </ul>
      </section>
    );
  }
}

export default Ranking;
