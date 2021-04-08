import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { getGravatar } from '../serviceAPI';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.getAvatar = this.getAvatar.bind(this);
  }

  getAvatar(email) {
    const emailHash = md5(email).toString();
    const requestHash = `https://www.gravatar.com/avatar/${emailHash}`;
    return requestHash;
  }

  render() {
    const { name, gravatarEmail, score } = this.props;

    return (
      <header>
        <img
          src={ this.getAvatar(gravatarEmail) }
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
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
