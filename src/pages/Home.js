import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { questionsAPI } from '../services/api';

class Home extends Component {
  constructor(props) {
    super(props);
    this.getQuestions = this.getQuestions.bind(this);
  }

  async getQuestions() {
    const { token } = this.props;
    const questions = await questionsAPI(token);
    console.log(questions[0].category);
    return questions[0];
  }

  render() {
    const { nickname, email, token } = this.props;
    const hashEmail = md5(email).toString();
    console.log(`Token: ${token}`);
    console.log(`Hash: ${hashEmail}`);
    this.getQuestions();
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
        <main>
          <p
            data-testid="question-category"
          >
            Categoria:
          </p>
          <p data-testid="question-text">Pergunta</p>
          <button type="button" data-testid="correct-answer">Alternativa 1</button>
          <button type="button" data-testid="wrong-answer-0">Alternativa 2</button>
          <button type="button" data-testid="wrong-answer-1">Alternativa 3</button>
          <button type="button" data-testid="wrong-answer-2">Alternativa 4</button>
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  nickname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  nickname: state.user.nickname,
  token: state.game.token,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchQuestions: (token) => dispatch(questionsAPI(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
