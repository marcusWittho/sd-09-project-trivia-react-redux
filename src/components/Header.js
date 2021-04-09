import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { name, score, avatar } = this.props;
    return (
      <header>
        <img
          src={ avatar }
          alt="userImage"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">
          Username:
          <span>{ name }</span>
        </p>
        <p data-testid="header-score">
          Placar:
          <span>{ score }</span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  avatar: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
