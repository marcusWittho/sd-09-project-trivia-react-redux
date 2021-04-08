import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../actions/index';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerIndex: 0,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  componentDidMount() {
    const { propQuestions } = this.props;
    propQuestions();
  }

  nextQuestion(event) {
    const maxIndex = 4;
    const { answerIndex } = this.state;
    if (answerIndex === maxIndex) {
      event.target.innerText = 'Finalizar';
    } else {
      this.setState({ answerIndex: answerIndex + 1 });
    }
  }

  renderAnswers() {
    const { answerIndex } = this.state;
    const { questions } = this.props;
    const courrentAnswer = questions.results[answerIndex];
    const beetween = 0.5;

    if (courrentAnswer.type === 'multiple') {
      const answer = courrentAnswer.incorrect_answers;
      answer.push(courrentAnswer.correct_answer);
      const sortanswer = answer.sort(() => Math.random() - beetween);
      return (
        <section>
          {sortanswer.map((selected, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `${selected === courrentAnswer.correct_answer
                ? 'correct' : 'wrong'}-answer-${index}` }
            >
              {selected}
            </button>
          ))}
        </section>
      );
    }
    const answer = [];
    answer.push(courrentAnswer.incorrect_answers[0], courrentAnswer.correct_answer);
    const sortanswer = answer.sort(() => Math.random() - beetween);
    return (
      <section>
        {sortanswer.map((selected, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${selected === courrentAnswer.correct_answer
              ? 'correct' : 'wrong'}-answer-${index}` }
          >
            {selected}
          </button>
        ))}
      </section>
    );
  }

  render() {
    const { answerIndex } = this.state;
    const { isFetching } = this.props;
    if (isFetching === true) {
      return <h1>Carregando</h1>;
    }
    const { questions } = this.props;
    const courretAsk = questions.results[answerIndex];
    console.log(questions);
    return (
      <div>
        <section>
          <h1 data-testid="question-category">
            { courretAsk.category }
          </h1>
          <p data-testid="question-text">{ courretAsk.question }</p>
        </section>
        {this.renderAnswers()}
        <button type="button" onClick={ this.nextQuestion }>Proxima</button>
      </div>
    );
  }
}

Game.propTypes = {
  propQuestions: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ actionsReducer: { token, questions, isFetching } }) => ({
  token,
  questions,
  isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  propQuestions: () => dispatch(getQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
