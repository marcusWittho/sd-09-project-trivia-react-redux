import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GamePlayHeader extends React.Component {
  render() {
    const { avatar, name } = this.props;
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
            { name }
          </div>
          <div
            data-testid="header-score"
            className="header-title"
          >
            Points: 0
          </div>
        </div>
      </header>
    );
  }
}

const mapStatetoProps = (state) => ({
  avatar: state.triviaReducer.avatar,
  name: state.triviaReducer.name,
});

GamePlayHeader.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStatetoProps)(GamePlayHeader);
