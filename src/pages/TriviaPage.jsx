import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class TriviaPage extends React.Component {
  componentDidUpdate() {
    const { token } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
  }

  render() {
    const { fetching, emailInput, nameInput } = this.props;
    const emailHash = MD5(emailInput).toString();
    if (fetching) {
      return (
        <h1>Carregando...</h1>
      );
    }

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
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
  fetching: state.tokenReducer.isFetching,
  emailInput: state.loginReducer.emailInput,
  nameInput: state.loginReducer.nameInput,
});

TriviaPage.propTypes = {
  token: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  emailInput: PropTypes.string.isRequired,
  nameInput: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(TriviaPage);
