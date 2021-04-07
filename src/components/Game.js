import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncAsks } from '../actions';

class Game extends React.Component {
  componentDidMount() {
    const { getAsks, token } = this.props;
    getAsks(token);
  }

  formatAnswers(obj) {
    return [
      { correct: true, value: obj.correct_answer },
      ...obj.incorrect_answers
        .map((item, index) => ({ correct: false, index, value: item })),
    ];
  }

  shuffleAnswers(array) {
    let m = array.length;
    let t;
    let i;
    while (m) {
      i = Math.floor(Math.random() * (m -= 1));
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  elementAskAndAnswer(objAsk) {
    const { category, question } = objAsk;
    const answersFormated = this.formatAnswers(objAsk);
    const arrayShuffle = this.shuffleAnswers(answersFormated);
    return (
      <div className="ask-container">
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        { arrayShuffle.map((answer) => {
          if (answer.correct) {
            return (
              <button
                className="btn-answer"
                type="button"
                key={ answer.value }
                data-testid="correct-answer"
              >
                { answer.value }
              </button>
            );
          }
          return (
            <button
              className="btn-answer"
              type="button"
              key={ answer.value }
              data-testid={ `wrong-answer-${answer.index}` }
            >
              { answer.value }
            </button>
          );
        }) }
      </div>
    );
  }

  render() {
    const { asks } = this.props;
    return (
      <div>
        { asks.map((objAsk) => this.elementAskAndAnswer(objAsk)) }
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  asks: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAsks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  asks: state.askAndAnswersReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getAsks: (token) => dispatch(asyncAsks(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
