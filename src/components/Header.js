import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { nickname, email, userScore } = this.props;
    const hashEmail = md5(email).toString();
    return (
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
        <span data-testid="header-score">
          Score:
          { userScore }
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  nickname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  userScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  nickname: state.user.nickname,
  userScore: state.score.currentScore,
});

export default connect(mapStateToProps)(Header);
