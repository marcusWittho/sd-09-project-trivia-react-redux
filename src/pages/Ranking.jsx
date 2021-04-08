import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getRanking = this.getRanking.bind(this);
  }

  getRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return ranking;
  }

  layoutPlayer(player, index) {
    return (
      <section>
        <h3>{`${index + 1}º lugar`}</h3>
        <span>
          <img
            src={ `https://www.gravatar.com/avatar/${player.picture}` }
            alt="imagem do jogador"
          />
          <span data-testid={ `player-name-${index}` }>{player.name}</span>
          <span data-testid={ `player-score-${index}` }>{player.score}</span>
        </span>
      </section>
    );
  }

  mapRankingPlayers(ranking) {
    console.log(ranking);
    ranking.sort((a, b) => a.score - b.score);
    ranking.map((player, index) => this.layoutPlayer(player, index));
  }

  render() {
    const ranking = this.getRanking();
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          {this.mapRankingPlayers(ranking)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatar: state.trivia.gravatar,
});

export default connect(mapStateToProps)(Ranking);
