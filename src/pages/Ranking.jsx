import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getScore = this.getScore.bind(this);
  }

  getScore() {
    const state = JSON.parse(localStorage.getItem('state'));
    return state;
  }

  render() {
    const index = 0;
    const { gravatar } = this.props;
    const { player } = this.getScore();
    return (
      <div>
        <h1>Ranking</h1>
        <div>
          <section>
            <h3>Primeiro lugar</h3>
            <span>
              <img
                src={ gravatar }
                alt="imagem do primeiro colocado no ranking do jogo"
              />
              <span data-testid={ `player-name-${index}` }>{player.name}</span>
              <span data-testid={ `player-score-${index}` }>{player.score}</span>
            </span>
          </section>
          <section>
            <h3>Segundo lugar</h3>
            <span>
              <img
                src={ gravatar }
                alt="imagem do segundo colocado no ranking do jogo"
              />
              <span data-testid={ `player-name-${index}` }>{player.name}</span>
              <span data-testid={ `player-score-${index}` }>{player.score}</span>
            </span>
          </section>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  gravatar: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  gravatar: state.trivia.gravatar,
});

export default connect(mapStateToProps)(Ranking);
