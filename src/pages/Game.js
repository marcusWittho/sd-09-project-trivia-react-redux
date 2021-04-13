import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Question from '../components/Question';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
    };
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
  }

  goToNextQuestion() {
    this.setState(({ questionIndex }) => ({
      questionIndex: questionIndex + 1,
    }));
  }

  render() {
    const { isFetching, questions, questionsAmount } = this.props;
    const questionCanBeRendered = !isFetching && questions.length > 0;
    const { questionIndex } = this.state;
    const goToFeedback = questionIndex >= questionsAmount;
    const question = questions[questionIndex];

    if (goToFeedback) {
      return (
        <Redirect to="/feedback" />
      );
    }

    return (
      <>
        <Header />
        { questionCanBeRendered && <Question
          question={ question }
          goToNextQuestion={ this.goToNextQuestion }
        /> }
      </>
    );
  }
}

const mapStateToProps = (
  { trivia: { questions, isFetching }, settings: { amount: questionsAmount } },
) => ({ questions, isFetching, questionsAmount });

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      type: PropTypes.string,
      difficulty: PropTypes.string,
      question: PropTypes.string,
      correct_answer: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  isFetching: PropTypes.bool.isRequired,
  questionsAmount: PropTypes.number.isRequired,
};
