import React from 'react';
import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';

class Header extends React.Component {
  gravatarHash() {
    const { email } = this.props;
    const hash = CryptoJS.MD5(email).toString();
    return hash;
  }

  render() {
    const { name } = this.props;
    const hash = this.gravatarHash();
    const score = 0;
    return (
      <>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="imagen gravatar" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{`Score:${score}`}</p>
      </>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Header;
