import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Timer from './Timer';

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerIndex: 0,
      color: false,
      isButtonDisabled: false,

    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.renderQuestionsAndCategories = this.renderQuestionsAndCategories.bind(this);
    this.changeColorAnswer = this.changeColorAnswer.bind(this);
    this.renderMutipleAnswers = this.renderMutipleAnswers.bind(this);
  }

  nextQuestion(event) {
    const maxIndex = 4;
    const { answerIndex } = this.state;
    if (answerIndex === maxIndex) {
      event.target.innerText = 'Finalizar';
    } else {
      this.setState({ answerIndex: answerIndex + 1, color: false });
    }
  }

  changeColorAnswer() {
    this.setState({
      color: true,
    });
  }

  renderMutipleAnswers() {
    const { answerIndex, color } = this.state;
    const { questions } = this.props;

    const courrentQuestion = questions.results[answerIndex];

    const beetween = 0.5;
    const answer = [...courrentQuestion.incorrect_answers,
      courrentQuestion.correct_answer];
    const sortanswer = answer.sort(() => Math.random() - beetween);
    return (
      <section>
        {sortanswer.map((selected, index) => (
          <button
            onClick={ this.changeColorAnswer }
            key={ index }
            type="button"
            data-testid={ `${selected === courrentQuestion.correct_answer
              ? 'correct-answer' : `wrong-answer-${index}`}` }
            className={ `${color ? `${selected === courrentQuestion.correct_answer
              ? 'correct' : 'wrong'}` : 'no-color'}` }
          >
            {selected}
          </button>
        ))}
      </section>
    );
  }

  renderQuestionsAndCategories() {
    const { answerIndex } = this.state;
    const { questions } = this.props;

    const courretAsk = questions.results[answerIndex];
    return (
      <section>
        <h1 data-testid="question-category">
          { courretAsk.category }
        </h1>
        <p data-testid="question-text">{ courretAsk.question }</p>
      </section>);
  }

  renderAnswers() {
    const { answerIndex, color } = this.state;
    const { questions } = this.props;
    const courrentQuestion = questions.results[answerIndex];

    if (courrentQuestion.type === 'multiple') {
      return this.renderMutipleAnswers();
    }
    const beetween = 0.5;

    const answer = [courrentQuestion.incorrect_answers[0],
      courrentQuestion.correct_answer];
    const sortanswerToF = answer.sort(() => Math.random() - beetween);

    return (
      <section>
        {sortanswerToF.map((selected, index) => (
          <button
            disabled={ this.state.isButtonDisabled }
            onClick={ this.changeColorAnswer }
            id="tof-button"
            key={ index }
            type="button"
            data-testid={ `${selected === courrentQuestion.correct_answer
              ? 'correct-answer' : `wrong-answer-${index}`}` }
            className={ `${color ? `${selected === courrentQuestion.correct_answer
              ? 'correct' : 'wrong'}` : 'no-color'}` }
          >
            {selected}
          </button>
        ))}
      </section>
    );
  }

  render() {
    const { loading } = this.props;
    if (loading) return <h1>Carregando...</h1>;
    return (
      <div>
        {this.renderQuestionsAndCategories()}
        {this.renderAnswers()}
        <Timer />
        <button type="button" onClick={ this.nextQuestion }>Proxima</button>
      </div>
    );
  }
}

Answers.propTypes = {
  propQuestions: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ actionsReducer: { questions, loading } }) => ({
  questions,
  loading,
});

export default connect(mapStateToProps)(Answers);
