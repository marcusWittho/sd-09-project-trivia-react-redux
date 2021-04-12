import React from 'react';
import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';
import { connect } from 'react-redux';
import { userAvatar } from '../redux/actions/index';

class Header extends React.Component {
  gravatarHash() {
    const { email, sendImage } = this.props;
    const hash = CryptoJS.MD5(email).toString();
    sendImage(`https://www.gravatar.com/avatar/${hash}`);
    return hash;
  }

  render() {
    const { name, score } = this.props;
    const hash = this.gravatarHash();

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
  sendImage: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendImage: (image) => dispatch(userAvatar(image)),
});

export default connect(null, mapDispatchToProps)(Header);
