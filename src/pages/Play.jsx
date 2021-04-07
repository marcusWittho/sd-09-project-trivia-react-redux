import React from 'react';
import { connect } from 'react-redux';

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
    };
    this.handleAnswers = this.handleAnswers.bind(this);
  }

  componentDidMount() {
    this.handleAnswers();
  }

  handleAnswers() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    console.log(questions);
    console.log(questionIndex);
    const currentQuestion = questions[questionIndex];
    console.log(currentQuestion);
    // const fakeNumber = 0.5;
    // const {
    //   correct_answer: correctAnswer,
    //   incorrect_answers: incorrectAnswers,
    // } = currentQuestion;
    // const answers = [correctAnswer, ...incorrectAnswers];
    // console.log(answers);
    // const randomizedAnswers = answers.sort(() => fakeNumber - Math.random());
    // console.log(randomizedAnswers);
  }

  render() {
    const { questions } = this.state;
    return (
      <main>
        <section>
          <p
            data-testid="question-category"
          >
            categoria
          </p>
          <p
            data-testid="question-text"
          >
            pergunta
          </p>
        </section>
        <section>
          OI!
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.triviaReducer.questions,
});

export default connect(mapStateToProps)(Play);
