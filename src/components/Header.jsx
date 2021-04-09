import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SettingsButton from './SettingsButton';

class Header extends Component {
  render() {
    const { userName, userEmail } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(userEmail).toString()}` }
          alt="Imagem do Jogador"
        />
        <h3 data-testid="header-player-name">{ userName }</h3>
        <p data-testid="header-score" />
        <SettingsButton />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.loginReducer.userName,
  userEmail: state.loginReducer.userEmail,
});

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
