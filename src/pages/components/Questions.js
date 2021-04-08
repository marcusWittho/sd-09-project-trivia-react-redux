import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Api from '../../service/Api';
import '../../styles/components/Questions.css';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      question: '',
      alternatives: [],
      correctAnswer: '',
      questionIndex: 0,
      isSelected: false,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { questionIndex } = this.state;
    const { token } = this.props;
    const questions = await Api.fetchQuestions(token);
    this.setState({
      category: questions[questionIndex].category,
      question: questions[questionIndex].question,
      alternatives: [
        questions[questionIndex].correct_answer,
        ...questions[questionIndex].incorrect_answers,
      ].sort(),
      correctAnswer: questions[questionIndex].correct_answer,
    });
  }

  handleClick() {
    this.setState({
      isSelected: true,
    });
  }

  render() {
    const { category, question, alternatives, correctAnswer, isSelected } = this.state;
    const number = -1;
    let indexQuestion = number;
    return (
      <div>
        <h4 data-testid="question-category">{ category }</h4>
        <p data-testid="question-text">{ question }</p>
        {alternatives.map((alternative, index) => {
          if (alternative === correctAnswer) {
            return (
              <button
                type="button"
                key={ index }
                className={ (isSelected) ? 'correct-answer' : undefined }
                data-testid="correct-answer"
                onClick={ this.handleClick }
              >
                { alternative }
              </button>);
          }
          indexQuestion += 1;
          return (
            <button
              type="button"
              key={ index }
              className={ (isSelected) ? 'wrong-answer' : undefined }
              data-testid={ `wrong-answer-${indexQuestion}` }
              onClick={ this.handleClick }
            >
              { alternative }
            </button>);
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginUser.token,
});

Questions.propTypes = {
  token: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Questions);
