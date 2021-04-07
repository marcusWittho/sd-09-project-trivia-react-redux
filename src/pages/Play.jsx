import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../styles/Play.css';

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      addClass: false,
      randomized: [],
      isButtonsRandomized: false,
    };
    this.handleAnswers = this.handleAnswers.bind(this);
    this.toggle = this.toggle.bind(this);
    this.questionGenerator = this.questionGenerator.bind(this);
  }

  componentDidUpdate() {
    const { questions } = this.props;
    const { isButtonsRandomized } = this.state;
    if (questions.length > 0 && !isButtonsRandomized) {
      this.handleAnswers();
    }
  }

  toggle() {
    const { addClass } = this.state;
    this.setState({
      addClass: !addClass,
    });
  }

  questionGenerator() {
    const { randomized, addClass } = this.state;
    return (
      <section>
        {
          randomized.map(({ isTrue, answer }, index) => {
            if (!isTrue) {
              return (
                <button
                  key={ index }
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  className={ addClass ? 'fail' : 'riddle' }
                  onClick={ this.toggle }
                >
                  { answer }
                </button>
              );
            }
            return (
              <button
                type="button"
                key={ index }
                data-testid="correct-answer"
                className={ addClass ? 'success' : 'riddle' }
                onClick={ this.toggle }
              >
                { answer }
              </button>
            );
          })
        }
      </section>
    );
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
    const correct = {
      isTrue: true,
      answer: correctAnswer,
    };
    const wrongAnswer = incorrectAnswers.map((answer) => ({
      isTrue: false,
      answer,
    }));
    const fakeNumber = 0.5;
    const answersButtons = [correct, ...wrongAnswer];
    const randomizedAnswers = answersButtons.sort(() => fakeNumber - Math.random());
    this.setState({
      randomized: randomizedAnswers,
      isButtonsRandomized: true,
    });
  }

  render() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    if (questions.length === 0) return <div>Loading...</div>;
    const currentQuestion = questions[questionIndex];
    const { category, question } = currentQuestion;
    return (
      <main>
        <Header />

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
        { this.questionGenerator() }
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
