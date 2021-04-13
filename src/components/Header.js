import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

import logo from '../assets/trivia.png';

class Header extends Component {
  render() {
    const { email, name } = this.props;
    return (
      <header className={ !name && !email ? 'header-login' : 'in-game-header' }>
        <div className="img-container">
          <img
            className="avatar-img"
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
            alt="gravatar"
          />
        </div>
        <img
          className="trivia-logo-ingame"
          src={ logo }
          alt="Trivia Logo"
        />
        <div className="header-text-container">
          <p data-testid="header-player-name">
            Jogador:
            <br />
            { name }
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
