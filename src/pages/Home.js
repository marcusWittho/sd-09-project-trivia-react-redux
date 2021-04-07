import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Home extends Component {
  render() {
    const { nickname, email } = this.props;
    const hashEmail = md5(email).toString();
    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${hashEmail}` }
            data-testid="header-profile-picture"
            alt="User Gravatar"
          />
          <span data-testid="header-player-name">
            Jogador:
            { nickname }
          </span>
          <span data-testid="header-score">Score: 0</span>
        </header>
      </div>
    );
  }
}

Home.propTypes = {
  nickname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  nickname: state.user.nickname,
});

export default connect(mapStateToProps)(Home);
