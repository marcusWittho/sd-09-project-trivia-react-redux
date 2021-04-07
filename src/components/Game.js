import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { disabledQuest, nextQuest } from '../actions/gameAction';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.changeQuest = this.changeQuest.bind(this);
    this.createQuest = this.createQuest.bind(this);
    this.buttonQuest = this.buttonQuest.bind(this);
    this.timeNumberFunc = this.timeNumberFunc.bind(this);

    this.state = {
      index: 0,
      timeNumber: 30,
      disabledQuest: false,
      disabledButton: true,
    };
  }

  componentDidMount() {
    this.timeNumberFunc();
  }

  componentDidUpdate() {
    const { timeNumber } = this.state;
    if (timeNumber < 1) {
      clearInterval(this.time);
    }
  }

  changeQuest() {
    this.setState((prevState) => ({
      index: prevState.index + 1,
      disabledQuest: false,
      disabledButton: true,
      timeNumber: 30,
    }));
    this.timeNumberFunc();
  }

  timeNumberFunc() {
    const timerInterval = 1000;

    this.time = setInterval(() => {
      this.setState((prevState) => ({
        timeNumber: prevState.timeNumber - 1,
      }));
    }, timerInterval);
  }

  buttonQuest() {
    const buttonC = document.querySelector('.button-correct');
    buttonC.style.border = '3px solid rgb(6, 240, 15)';

    const buttonIC = document.querySelectorAll('.button-incorrect');
    buttonIC.forEach((button) => { button.style.border = '3px solid rgb(255, 0, 0)'; });

    clearInterval(this.time);
    this.setState({
      disabledQuest: true,
      disabledButton: false,
    });
  }

  createQuest(index) {
    const { questions } = this.props;
    const { disabledQuest, timeNumber } = this.state;

    const t = [...questions[index].incorrect_answers, questions[index].correct_answer];
    // const random = 0.5;
    // t = t.sort(() => Math.random() - random);

    return (
      <div>
        { t.map((response, indexRep) => {
          if (response === questions[index].correct_answer) {
            return (
              <button
                type="button"
                className="button-correct"
                key={ response }
                onClick={ this.buttonQuest }
                disabled={ disabledQuest || timeNumber < 1 }
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
              onClick={ this.buttonQuest }
              disabled={ disabledQuest || timeNumber < 1 }
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
    const { index, disabledButton, timeNumber } = this.state;

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
          hidden={ disabledButton && timeNumber !== 0 }
          data-testid="btn-next"
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
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Game);
