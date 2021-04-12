import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.sortRanking = this.sortRanking.bind(this);
  }

  componentDidMount() {
    const { players } = this.props;
    const arrayLocal = players.map((player) => ({
      name: player.name,
      score: player.score,
      picture: player.gravatarEmail,
    }));
    localStorage.setItem('ranking', JSON.stringify(arrayLocal));
  }

  sortRanking(a, b) {
    return (b.score - a.score);
  }

  render() {
    const { players } = this.props;
    const sortPlayers = players.sort(this.sortRanking);

    return (
      <div>
        <h2 data-testid="ranking-title">RANKING</h2>
        <ul>
          { sortPlayers.map((player, index) => (
            <li key={ player.name }>
              <img src={ player.picture } alt="User_Avatar" />
              <h2 data-testid={ `player-name-${index}` }>{player.name}</h2>
              <h2 data-testid={ `player-score-${index}` }>{player.score}</h2>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  players: state.rankingReducer.players,
});

Ranking.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Ranking);
