import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.getScore = this.getScore.bind(this);
    this.getFeedback = this.getFeedback.bind(this);
  }

  getScore() {
    const state = JSON.parse(localStorage.getItem('state'));
    return state;
  }

  getFeedback(score) {
    const medianScore = 3;
    const bellowThree = score < medianScore;
    switch (bellowThree) {
    case true:
      return 'Podia ser melhor...';
    default:
      return 'Mandou bem!';
    }
  }

  render() {
    const { player } = this.getScore();
    const { gravatar } = this.props;
    return (
      <main>
        <header>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${gravatar}` } alt={ player.name } />
          <span data-testid="header-player-name">{player.name}</span>
          <span data-test-id="header-score">{player.score}</span>
        </header>
        <section>
          <h3 data-testid="feedback-text">{this.getFeedback(player.score)}</h3>
          <h2 data-testid="feedback-total-score">{player.score}</h2>
          <h3 data-testid="feedback-total-question">{player.assertions}</h3>
        </section>
        <section>
          <button type="button" data-testid="btn-play-again">
            <Link to="/">Jogar novamente</Link>
          </button>
        </section>
      </main>
    );
  }
}

Feedback.propTypes = {
  gravatar: PropTypes.string.isRequired,
};

const stateToProps = (state) => ({
  gravatar: state.trivia.gravatar,
});

export default connect(stateToProps)(Feedback);
