import React, { Component } from 'react';
import './Header.css';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
    };
  }

  render() {
    const { score } = this.state;
    const { email, name } = this.props;
    const emailHash = md5(email).toString();

    return (
      <header>
        <div className="header">
          <img
            src={ `https://www.gravatar.com/avatar/${emailHash} ` }
            alt="player"
            data-testid="header-profile-picture"
            className="player-image"
          />
          <p className="player-name" data-testid="header-player-name">
            {' '}
            Jogador:
            {' '}
            { name }
          </p>
          <p className="score" data-testid="header-score">
            Pontos:
            {' '}
            { score }
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;
