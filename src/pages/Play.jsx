import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
    };
    this.handleAnswers = this.handleAnswers.bind(this);
  }

  // A função do Math.random da linha 43 foi retirada do site stackoverflow no link:
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  handleAnswers() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    const currentQuestion = questions[questionIndex];
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = currentQuestion;
    const correct = (
      <button
        type="button"
        data-testid="correct-answer"
      >
        { correctAnswer }
      </button>
    );
    const incorrect = incorrectAnswers.map((answer, index) => (
      <button
        key={ index }
        type="button"
        data-testid={ `wrong-answer-${index}` }
      >
        { answer }
      </button>
    ));
    const fakeNumber = 0.5;
    const answersButtons = [correct, ...incorrect];
    const randomizedButtons = answersButtons.sort(() => fakeNumber - Math.random());
    return randomizedButtons;
  }

  render() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    if (questions.length === 0) return <div>Loading...</div>;
    const randomizedAnswers = this.handleAnswers();
    const currentQuestion = questions[questionIndex];
    const { category, question } = currentQuestion;
    return (
      <main>
        <section>
          <p
            data-testid="question-category"
          >
            { category }
          </p>
          <p
            data-testid="question-text"
          >
            { question }
          </p>
        </section>
        <section>
          {
            randomizedAnswers.map((button) => button)
          }
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.triviaReducer.questions,
});

Play.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Play);
