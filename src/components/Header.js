import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, gravatar, score } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${gravatar}` }
          alt="user-gravatar"
        />
        <p data-testid="header-player-name">{name}</p>
        <div data-testid="header-score">{score}</div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.gameReducer.player.name,
  gravatar: state.gameReducer.player.gravatarEmail,
  score: state.gameReducer.player.score,

});

Header.propTypes = {
  gravatar: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
