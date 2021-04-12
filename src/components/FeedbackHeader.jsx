import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './FeedbackHeader.css';

class FeedbackHeader extends React.Component {
  render() {
    const { avatar, playerName, score } = this.props;
    return (
      <div className="feedback-header">
        <img src={ avatar } alt="avatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ `Jogador: ${playerName}` }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

FeedbackHeader.propTypes = {
  avatar: PropTypes.string,
  playerName: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  avatar: state.triviaReducer.avatar,
  playerName: state.triviaReducer.player.name,
  score: state.triviaReducer.player.score,
});

export default connect(mapStateToProps)(FeedbackHeader);
