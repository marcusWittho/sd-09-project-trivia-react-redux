import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
    };
  }

  render() {
    const { isFetching, questions } = this.props;
    const questionCanBeRendered = !isFetching && questions.length > 0;
    const { questionIndex } = this.state;
    const question = questions[questionIndex];

    return (
      <>
        <Header />
        { questionCanBeRendered && <Question question={ question } /> }
      </>
    );
  }
}

const mapStateToProps = (
  { trivia: { questions, isFetching } },
) => ({ questions, isFetching });

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
};
