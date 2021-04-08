import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './Header.css';

class Header extends Component {
  render() {
    const { email, name } = this.props;
    return (
      <header className="in-game-header">
        <img
          className="avatar-img"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt="gravatar"
        />
        <div className="header-text-container">
          <p data-testid="header-player-name">
            Jogador:
            { name }
          </p>
          <p data-testid="header-score">Score: 0</p>
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
