import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/question';

// const fooQuestions = [{
//   category: 'Science: Computers',
//   type: 'multiple',
//   difficulty: 'easy',
//   question: 'The seriseries (Broadwell) is called:',
//   correctAnswer: 'wsqehn',
//   incorrectAnswers: [
//     'sfdfsdahics 700 ',
//     'asdfbdg',
//     'uewgbfdfg',
//   ],
// }];

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
    };
  }

  render() {
    const { currentQuestion } = this.state;
    const { questions, loading } = this.props;
    return (
      (loading) ? <p>carregando</p>
        : (
          <div>
            <Header />
            <p>Game Page</p>
            <Question questionData={ questions[currentQuestion] } />
          </div>
        )
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.reducer.loading,
  questions: state.reducer.questions,
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Game);
