import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { fetchQuestions } from '../redux/actions';
// import Header from '../components/Header';
import Question from '../components/Question';

class TriviaPage extends React.Component {
  componentDidMount() {
    const { getQuestions, token } = this.props;
    const storageToken = localStorage.getItem('token');
    if (storageToken && storageToken.length > 0) {
      getQuestions(JSON.parse(storageToken));
    } else {
      getQuestions(token);
    }
  }

  componentDidUpdate() {
    const { token, emailInput, nameInput, score, assertions } = this.props;
    const currentToken = localStorage.getItem('token');
    const information = {
      player: {
        name: nameInput,
        score,
        assertions,
        gravatarEmail: emailInput,
      },
    };
    if (currentToken !== token) {
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('state', JSON.stringify(information));
    }
  }

  render() {
    const { fetching, emailInput, nameInput, score } = this.props;
    const emailHash = md5(emailInput).toString();
    if (fetching) {
      return (
        <h1>Carregando...</h1>
      );
    }

    return (
      <>
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
        <Question />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
  fetching: state.tokenReducer.isFetching,
  emailInput: state.loginReducer.emailInput,
  nameInput: state.loginReducer.nameInput,
  score: state.scoreReducer.score,
  assertions: state.scoreReducer.assertions,
});

const mapDispatchToProps = {
  getQuestions: fetchQuestions,
};

TriviaPage.propTypes = {
  token: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  getQuestions: PropTypes.func.isRequired,
  emailInput: PropTypes.string.isRequired,
  nameInput: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TriviaPage);
