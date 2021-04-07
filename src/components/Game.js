import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { disabledQuest, nextQuest } from '../actions/gameAction';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.changeQuest = this.changeQuest.bind(this);
    this.createQuest = this.createQuest.bind(this);
    this.buttonQuest = this.buttonQuest.bind(this);

    this.state = {
      index: 0,
    };
  }

  changeQuest() {
    const { setNextQuest } = this.props;
    setNextQuest();
    this.setState((prevState) => ({
      index: prevState.index + 1,
    }));
  }

  buttonQuest(timerButton) {
    const buttonC = document.querySelector('.button-correct');
    buttonC.style.border = '3px solid rgb(6, 240, 15)';

    const buttonIC = document.querySelectorAll('.button-incorrect');
    buttonIC.forEach((button) => { button.style.border = '3px solid rgb(255, 0, 0)'; });

    const { setDisabledQuest } = this.props;
    clearTimeout(timerButton);
    setDisabledQuest();
  }

  createQuest(index) {
    const { questions, getDisableQuest, setDisabledQuest } = this.props;

    const t = [...questions[index].incorrect_answers, questions[index].correct_answer];
    // const random = 0.5;
    // t = t.sort(() => Math.random() - random);

    const timeNumber = 30000;
    const timerButton = setTimeout(() => {
      setDisabledQuest();
    }, timeNumber);

    return (
      <div>
        { t.map((response, indexRep) => {
          if (response === questions[index].correct_answer) {
            return (
              <button
                type="button"
                className="button-correct"
                key={ response }
                onClick={ () => this.buttonQuest(timerButton) }
                disabled={ getDisableQuest }
                data-testid="correct-answer"
              >
                {response}
              </button>);
          }
          return (
            <button
              type="button"
              className="button-incorrect"
              key={ response }
              onClick={ () => this.buttonQuest(timerButton) }
              disabled={ getDisableQuest }
              data-testid={ `wrong-answer-${indexRep}` }
            >
              {response}
            </button>);
        }) }
      </div>
    );
  }

  render() {
    const { questions, loading } = this.props;
    const { index } = this.state;

    if (loading) {
      return (<p>Loading...</p>);
    }

    return (
      <div>
        <h1 data-testid="question-category">{questions[index].category}</h1>
        <p data-testid="question-text">{questions[index].question}</p>
        { this.createQuest(index) }
        <button
          type="button"
          onClick={ this.changeQuest }
        >
          Proxima
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
  loading: state.gameReducer.loading,
  getDisableQuest: state.gameReducer.disabledQuest,
});

const mapDispatchToProps = (dispatch) => ({
  setDisabledQuest: () => dispatch(disabledQuest()),
  setNextQuest: () => dispatch(nextQuest()),
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  setDisabledQuest: PropTypes.func.isRequired,
  getDisableQuest: PropTypes.bool.isRequired,
  setNextQuest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
