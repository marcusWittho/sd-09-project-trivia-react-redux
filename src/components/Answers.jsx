import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerIndex: 0,
      color: false,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.renderQuestionsAndCategories = this.renderQuestionsAndCategories.bind(this);
    this.changeColorAnswer = this.changeColorAnswer.bind(this);
    this.nextButton = this.nextButton.bind(this);
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

  nextButton(color) {
    return color && (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ this.nextQuestion }
      >
        Proxima
      </button>
    );
  }

  changeColorAnswer() {
    this.setState({
      color: true,
    });
  }

  renderQuestionsAndCategories(answerIndex, questions) {
    const courretAsk = questions.results[answerIndex];
    return (
      <section>
        <h1 data-testid="question-category">
          { courretAsk.category }
        </h1>
        <p data-testid="question-text">{ courretAsk.question }</p>
      </section>);
  }

  renderAnswers(answerIndex, questions, color) {
    const courrentQuestion = questions.results[answerIndex];
    const multipleAnswers = [
      ...courrentQuestion.incorrect_answers,
      courrentQuestion.correct_answer,
    ];
    const { type } = questions.results[answerIndex];
    const answer = type === 'multiple' ? multipleAnswers : ['True', 'False'];
    const beetween = 0.5;
    const sortanswerToF = answer.sort(() => Math.random() - beetween);
    return (
      <section>
        {sortanswerToF.map((selected, index) => (
          <button
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
    const { loading, questions } = this.props;
    const { color, answerIndex } = this.state;
    if (loading) return <h1>Carregando...</h1>;
    return (
      <div>
        {this.renderQuestionsAndCategories(answerIndex, questions)}
        {this.renderAnswers(answerIndex, questions, color)}
        {this.nextButton(color)}
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
