import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GamePlayHeader extends React.Component {
  render() {
    const { avatar, player } = this.props;
    return (
      <header className="header-player">
        <img
          src={ avatar }
          alt="gravatar"
          data-testid="header-profile-picture"
          className="gravatar"
        />
        <div className="game-header-info">
          <div
            className="header-title"
            data-testid="header-player-name"
          >
            Player:
            { player.name }
          </div>
          <div
            data-testid="header-score"
            className="header-title"
          >
            Points:
            { player.score }
          </div>
        </div>
      </header>
    );
  }
}

const mapStatetoProps = (state) => ({
  avatar: state.triviaReducer.avatar,
  player: state.triviaReducer.player,
});

GamePlayHeader.propTypes = {
  avatar: PropTypes.string,
  pleyer: PropTypes.shape(),
}.isRequired;

export default connect(mapStatetoProps)(GamePlayHeader);
