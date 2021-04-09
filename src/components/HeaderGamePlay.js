import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderGamePlay extends Component {
  render() {
    const { name, email } = this.props;
    const emailGravatar = md5(email).toString;
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${emailGravatar}` } alt="avatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
});

HeaderGamePlay.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(HeaderGamePlay);
