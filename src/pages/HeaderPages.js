import React from 'react';
import CryptoJS from 'crypto-js';
import PropTypes from 'prop-types';
import HomeButton from './HomeButton';

class HeaderPages extends React.Component {
  gravatarImg() {
    const { email } = this.props;
    const hash = CryptoJS.MD5(email);
    return (`https://www.gravatar.com/avatar/${hash}`);
  }

  render() {
    const { name, score } = this.props;
    return (
      <div>
        <header>
          <img
            src={ this.gravatarImg() }
            alt="imagem avatar"
            data-testid="header-profile-picture"
          />
          <span data-testid="header-player-name">{ name }</span>
          <span data-testid="header-score">{ score }</span>
        </header>
        Game
        <HomeButton />
      </div>
    );
  }
}
HeaderPages.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

// Falta connect com as actions/reducers(?)
export default HeaderPages;
