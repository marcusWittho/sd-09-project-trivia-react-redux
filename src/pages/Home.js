import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
// import { fetchQuestions, getQuestions } from '../actions/';
import { questionsAPI } from '../services/api';

class Home extends Component {
  constructor(props) {
    super(props);
    this.getQuestions = this.getQuestions.bind(this)
  }

  componentDidMount() {
    // this.getQuestions();
  }
  async getQuestions() {
    const { token } = this.props;
    const questions = await questionsAPI(token);
    console.log(questions)
    return questions;
  }

  render() {
    
    const { nickname, email, questionsList, token } = this.props;
    const hashEmail = md5(email).toString();
    console.log(`Token: ${token}`)
    console.log(`Hash: ${hashEmail}`)
    this.getQuestions()
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
            { console.log(this.getQuestions()) }
          </p>
          <p data-testid="question-text">Pergunta</p>
          <button data-testid="correct-answer">Alternativa 1</button>
          <button data-testid="wrong-answer-0">Alternativa 2</button>
          <button data-testid="wrong-answer-1">Alternativa 3</button>
          <button data-testid="wrong-answer-2">Alternativa 4</button>
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  nickname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  // questionsList: PropTypes.objectOf({}).isRequired,
  dispatchQuestions: PropTypes.func,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  nickname: state.user.nickname,
  // questionsList: state.questionsList,
  token: state.game.token,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchQuestions: (token) => dispatch(questionsAPI(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
