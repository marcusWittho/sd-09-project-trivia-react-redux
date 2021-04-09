import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addQuestions } from '../Redux/actions';
import { getQuestions } from '../services/Api';
import EachQuestion from './EachQuestion';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      questionAnswered: false,
    };
    this.dispatchQuestions = this.dispatchQuestions.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
  }

  componentDidMount() {
    this.dispatchQuestions();
  }

  async dispatchQuestions() {
    const { sendQuestionsToRedux } = this.props;
    const token = localStorage.getItem('token');
    const questions = await getQuestions(token);
    sendQuestionsToRedux(questions);
  }

  answerQuestion() {
    this.setState({ questionAnswered: true });
  }

  render() {
    const { questions } = this.props;
    const { currentQuestionIndex, questionAnswered } = this.state;
    if (!questions) {
      return (
        <main>
          Loading Game...
          <p data-testid="question-category">
            Categoria: ...
          </p>
          <p data-testid="question-text">Pergunta...</p>
          <button
            data-testid="correct-answer"
            type="button"
          >
            Alternativa 1...
          </button>
          <button
            data-testid="wrong-answer-0"
            type="button"
          >
            Alternativa 2...
          </button>
          <button
            data-testid="wrong-answer-1"
            type="button"
          >
            Alternativa 3...
          </button>
          <button
            data-testid="wrong-answer-2"
            type="button"
          >
            Alternativa 3...
          </button>
        </main>
      );
    }
    return (
      <EachQuestion
        questions={ questions }
        questionIndex={ currentQuestionIndex }
        questionAnswered={ questionAnswered }
        answerQuestion={ this.answerQuestion }
      />
    );
  }
}

Questions.propTypes = {
  sendQuestionsToRedux: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.getQuestions.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  sendQuestionsToRedux: (questions) => dispatch(addQuestions(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
