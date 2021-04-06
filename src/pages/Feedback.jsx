import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.getScore = this.getScore.bind(this);
    this.getRanking = this.getRanking.bind(this);
  }

  getScore() {
    const state = JSON.parse(localStorage.getItem('state'));
    return state;
  }

  render() {
    const { player } = this.getScore();
    const { gravatar } = this.props;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ gravatar } alt="" />
        <h1 data-testid="header-player-name">{player.name}</h1>
        <h2 data-test-id="header-score">{player.score}</h2>
      </header>
    );
  }
}

Feedback.propTypes = {
  gravatar: PropTypes.string.isRequired,
};

const stateToProps = (state) => ({
  gravatar: state.trivia.gravar,
});

export default connect(stateToProps)(Feedback);
