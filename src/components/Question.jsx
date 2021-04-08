import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Question.css';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionIndex: 0,
      clicked: false,
    };

    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      clicked: !state.clicked,
    }));
  }

  renderQuestion() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    return questions[questionIndex];
  }

  renderAnswers() {
    const { clicked } = this.state;
    const question = this.renderQuestion();
    return (
      <>
        <button
          type="button"
          data-testid="correct-answer"
          className={ (clicked) ? 'correct-answer' : '' }
          onClick={ this.handleClick }
        >
          {question.correct_answer}
        </button>
        {question.incorrect_answers.map((answer, index) => (
          <button
            type="button"
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            className={ (clicked) ? 'incorrect-answer' : '' }
            onClick={ this.handleClick }
          >
            {answer}
          </button>
        ))}
      </>
    );
  }

  render() {
    const { fetching } = this.props;

    if (fetching) {
      return <h3>Carregando pergunta...</h3>;
    }

    return (
      <div>
        Perguntas
        <h4>Category:</h4>
        <p data-testid="question-category">{this.renderQuestion().category}</p>
        <h4>Question:</h4>
        <p data-testid="question-text">{this.renderQuestion().question}</p>
        {this.renderAnswers()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  fetching: state.questionsReducer.isFetching,
});

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Question);
