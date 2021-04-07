import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { questionsAPI } from '../services/api';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsList: {},
    }
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const questions = await questionsAPI();
    this.setState({
      questionsList: questions,
    })
  }

  render() {
    const { nickname, email } = this.props;
    const hashEmail = md5(email).toString();
    const { questionsList } = this.state;
    console.log(Object.values(questionsList)[1]);

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
            {/* { questionsList.results[3].category } */}
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
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  nickname: state.user.nickname,
});

export default connect(mapStateToProps)(Home);
