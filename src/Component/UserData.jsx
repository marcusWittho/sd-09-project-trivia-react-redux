import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class UserData extends Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state')) || 0;
    const { email, name } = this.props;
    return (
      <div>
        <p data-testid="header-player-name">{ name }</p>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt=""
          data-testid="header-profile-picture"
        />
        <p data-testid="header-score">{ state ? state.player.score : 0 }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.setUser.email,
  name: state.setUser.name,
});

UserData.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(UserData);
