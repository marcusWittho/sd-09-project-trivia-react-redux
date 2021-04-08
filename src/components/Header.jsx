import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, imgSrc } = this.props;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ imgSrc } alt="Player profile" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default Header;
