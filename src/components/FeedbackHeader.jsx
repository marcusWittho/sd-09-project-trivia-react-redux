import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './FeedbackHeader.css';

class FeedbackHeader extends React.Component {
  render() {
    // const { avatar } = this.props;
    const avatar = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50';
    const player = 'daniel';
    const points = 20;
    return (
      <div className="feedback-header">
        <p data-testid="header-player-name">{ `Jogador: ${player}` }</p>
        <p data-testid="header-score">{ `Pontos: ${points}` }</p>
        <img src={ avatar } alt="avatar" data-testid="header-profile-picture" />
      </div>
    );
  }
}

FeedbackHeader.propTypes = {
  avatar: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  avatar: state.triviaReducer.avatar,
});

export default connect(mapStateToProps)(FeedbackHeader);
