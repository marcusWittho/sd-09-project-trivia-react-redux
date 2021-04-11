import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import HomeButton from './HomeButton';
import '../App.css';

class Header extends React.Component {
  addPoints() {
    // const { score } = this.props;
  }

  makeGravatarUrl() {
    const { email } = this.props;
    return `https://www.gravatar.com/avatar/${md5(email).toString()}`;
  }

  render() {
    const { name, score } = this.props;
    return (
      <header className="App-header">
        <img
          src={ this.makeGravatarUrl() }
          alt="avatar"
          className="App-logo"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{ `Nome: ${name} `}</span>
        <br />
        <span data-testid="header-score">{` Pontos: ${score}`}</span>
        <HomeButton />
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

// usar o dispatch para o updatescore
const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
