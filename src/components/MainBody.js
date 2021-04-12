import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { string, objectOf } from 'prop-types';
import { setScore } from '../actions';

class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styleObj: {},
      timer: 30,
      score: 0,
      assertions: 0,
      points: 10,
      none: 'none',
      index: 0,
    };

    this.showAnswers = this.showAnswers.bind(this);
    this.tictac = this.tictac.bind(this);
    this.nextClick = this.nextClick.bind(this);
  }

  componentDidMount() {
    this.timeOut();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer < 1) {
      clearInterval(this.temporizador);
    }
  }

  setNewScore(target) {
    const { handleScore, name, email, questions, scoreRedux } = this.props;
    const { timer, assertions, points } = this.state;
    if (target.name === 'resposta-certa') {
      if (questions[0].difficulty === 'easy') {
        handleScore(points + (timer * 1));
        localStorage.setItem('state',
          JSON.stringify({ player:
          { name,
            assertions: assertions + 1,
            score: scoreRedux + points + (timer * 1),
            email,
          } }));
        this.setState((previousState) => ({
          score: previousState.score + (points + (timer * 1)),
          assertions: previousState.assertions + 1,
        }));
      }
      if (questions[0].difficulty === 'medium') {
        handleScore(points + (timer * 2));
        localStorage.setItem('state',
          JSON.stringify({ player:
          { name,
            assertions: assertions + 1,
            score: scoreRedux + points + (timer * 2),
            email,
          } }));
        this.setState((previousState) => ({
          score: previousState.score + (points + (timer * 2)),
          assertions: previousState.assertions + 1,
        }));
      }
      if (questions[0].difficulty === 'hard') {
        handleScore(points + (timer * 3));
        localStorage.setItem('state',
          JSON.stringify({ player:
          { name,
            assertions: assertions + 1,
            score: scoreRedux + points + (timer * Number('3')),
            email,
          } }));
        this.setState((previousState) => ({
          score: previousState.score + (points + (timer * Number('3'))),
          assertions: previousState.assertions + 1,
        }));
      }
    }
  }

  timeOut() {
    const ONE_SECOND = 1000;
    const { name, email } = this.props;
    this.temporizador = setInterval(this.tictac, ONE_SECOND);
    localStorage.setItem('state',
      JSON.stringify({ player:
      { name,
        assertions: 0,
        score: 0,
        email,
      } }));
  }

  tictac() {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState({ timer: timer - 1 });
    }
  }

  showAnswers({ target }) {
    this.setState({
      styleObj: {
        correct: {
          border: '3px solid',
          borderColor: 'rgb(6, 240, 15)' },
        incorrect: {
          border: '3px solid',
          borderColor: 'rgb(255, 0, 0)' },
      },
    });
    this.setNewScore(target);
    this.showNextButton();
  }

  showNextButton() {
    this.setState({
      none: '',
    });
  }

  nextClick() {
    this.setState((previousState) => ({
      timer: 30,
      index: previousState.index + 1,
      styleObj: {},
    }));
  }

  render() {
    const { loading, questions } = this.props;
    const {
      styleObj,
      timer,
      none,
      index,
    } = this.state;
    if (index === Number('5')) return <Redirect to="/feedback" />;
    if (loading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <h3>{ timer }</h3>
        <p data-testid="question-category">{ questions[index].category }</p>
        <p data-testid="question-text">{ questions[index].question }</p>
        <button
          style={ styleObj.correct }
          name="resposta-certa"
          onClick={ this.showAnswers }
          type="button"
          data-testid="correct-answer"
          disabled={ timer < 1 }
        >
          { questions[index].correct_answer }
        </button>
        {questions[index].incorrect_answers.map((incorrectAnswer) => (
          <button
            style={ styleObj.incorrect }
            onClick={ this.showAnswers }
            type="button"
            key={ incorrectAnswer }
            data-testid="wrong-answer"
            disabled={ timer < 1 }
          >
            { incorrectAnswer }
          </button>
        ))}
        <button
          type="button"
          style={ { display: none } }
          data-testid="btn-next"
          onClick={ () => this.nextClick(index) }
        >
          Proximo
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.loginReducer.questions.results,
  loading: state.loginReducer.loading,
  email: state.loginReducer.email,
  name: state.loginReducer.name,
  scoreRedux: state.mainReducer.score,
});

const mapDispatchToProps = (dispatch) => ({
  handleScore: (score) => dispatch(setScore(score)),
});

MainBody.propTypes = {
  loading: string,
  questions: objectOf,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(MainBody);
