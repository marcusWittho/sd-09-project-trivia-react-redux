import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { emailInput, nameInput, score } = this.props;
    const emailHash = md5(emailInput).toString();
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${emailHash}` }
          alt="player-img"
        />
        Jogador:
        <span data-testid="header-player-name">{ nameInput }</span>
        Placar:
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  nameInput: state.loginReducer.nameInput,
  emailInput: state.loginReducer.emailInput,
  score: state.scoreReducer.score,
});

Header.propTypes = {
  emailInput: PropTypes.string.isRequired,
  nameInput: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
