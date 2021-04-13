import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import '../css/ranking.css';

class Ranking extends Component {
  render() {
    const { ranking } = this.props;
    // const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
    return (
      <div>
        <div className="App-header">
          <h1 data-testid="ranking-title">Ranking</h1>
          <table>
            <tr>
              <th>Posição</th>
              <th>Gravatar</th>
              <th>Nome</th>
              <th>Acertos</th>
              <th>Pontuação</th>
            </tr>
            {ranking
              .sort((player1, player2) => player2.score - player1.score)
              .map((player, index) => (
                <tr key={ index }>
                  <td>{`${index + 1}º`}</td>
                  <td>
                    <img src={ player.gravatar } alt={ `player-${index}-gravatar` } />
                  </td>
                  <td data-testid={ `player-name-${index}` }>{player.name}</td>
                  <td>{player.assertions}</td>
                  <td data-testid={ `player-score-${index}` }>{player.score}</td>
                </tr>
              ))}
          </table>
          <button type="button" data-testid="btn-go-home">
            <Link to="/">
              Home
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = ({
  ranking: PropTypes.arrayOf(
    PropTypes.shape({
      player: PropTypes.shape({
        name: PropTypes.string,
        gravatar: PropTypes.string,
        assertions: PropTypes.number,
        score: PropTypes.number,
      }),
    }),
  ),
}).isRequired;

const mapStateToProps = ({ rankingReducer: { ranking } }) => ({
  ranking,
});

export default connect(mapStateToProps, null)(Ranking);
