import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { correctAction } from '../actions/gameAction';

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
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
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

    const { getPlayer } = this.props;
    this.setState(() => ({
      player: getPlayer,
    }), () => {
      const { player } = this.state;
      localStorage.setItem('state', JSON.stringify({ player }));
    });
  }

  calculo(dific) {
    const { timeNumber } = this.state;
    const magicNumber = 10;
    return (magicNumber + (timeNumber * dific));
  }

  calculoScore(index) {
    const { setCorrectAction, questions } = this.props;
    const hard = 3;
    const medium = 2;
    const easy = 1;

    if (questions[index].difficulty === 'hard') {
      setCorrectAction(this.calculo(hard));
      this.setState((prevState) => ({
        player: {
          ...prevState.player,
          assertions: prevState.player.assertions + 1,
          score: prevState.player.score + (this.calculo(hard)),
        },
      }), () => {
        const { player } = this.state;
        localStorage.setItem('state', JSON.stringify({ player }));
      });
    } else if (questions[index].difficulty === 'medium') {
      setCorrectAction(this.calculo(medium));
      this.setState((prevState) => ({
        player: {
          ...prevState.player,
          assertions: prevState.player.assertions + 1,
          score: prevState.player.score + (this.calculo(medium)),
        },
      }), () => {
        const { player } = this.state;
        localStorage.setItem('state', JSON.stringify({ player }));
      });
    } else if (questions[index].difficulty === 'easy') {
      setCorrectAction(this.calculo(easy));
      this.setState((prevState) => ({
        player: {
          ...prevState.player,
          assertions: prevState.player.assertions + 1,
          score: prevState.player.score + (this.calculo(easy)),
        },
      }), () => {
        const { player } = this.state;
        localStorage.setItem('state', JSON.stringify({ player }));
      });
    }
  }

  buttonQuest(correct, index) {
    const buttonC = document.querySelector('.button-correct');
    buttonC.style.border = '3px solid rgb(6, 240, 15)';

    if (correct) {
      this.calculoScore(index);
    }

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
    const correct = true;
    const incorrect = false;

    return (
      <div>
        { t.map((response, indexRep) => {
          if (response === questions[index].correct_answer) {
            return (
              <button
                type="button"
                className="button-correct"
                key={ response }
                onClick={ () => this.buttonQuest(correct, index) }
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
              onClick={ () => this.buttonQuest(incorrect) }
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

    const numberFeedback = 4;
    if (index > numberFeedback) {
      return (<Redirect to="/feedback" />);
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
  getPlayer: state.gameReducer.player,
});

const mapDispatchToProps = (dispatch) => ({
  setCorrectAction: (score) => dispatch(correctAction(score)),
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  setCorrectAction: PropTypes.func,
  getPlayer: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
