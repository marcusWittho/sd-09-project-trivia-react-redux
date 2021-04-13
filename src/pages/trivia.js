import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Header from '../components/header';
import { setQuestions, setNext, setSelectedAnswer, setToken } from '../redux/actions';
import Question from '../components/question';

class trivia extends React.Component {
  constructor(pro) {
    super(pro);
    this.state = {
      index: 0,
      loading: true,
      answered: false,
      time: 30,
      disabled: false,
      redirect: false,
    };
    this.timer = 30;
    this.handleClick = this.handleClick.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  async componentDidMount() {
    const { propSetToken } = this.props;
    const { loading } = this.state;
    await propSetToken();
    if (loading) this.getQuestions();
  }

  componentDidUpdate() {
    this.startTimer();
  }

  getQuestions() {
    const { propSetQuestions } = this.props;
    propSetQuestions()
      .then(() => this.setState({ loading: false }));
  }

  countDown() {
    const { time, answered } = this.state;
    const { propSelectedAnswer } = this.props;
    const nextTime = time - 1;
    this.setState({ time: nextTime });
    if (nextTime === 0) {
      clearInterval(this.timer);
      if (!answered) {
        propSelectedAnswer(true);
        this.setState({ answered: true, disabled: true });
      }
      this.timer = 30;
    }
  }

  startTimer() {
    const maxTime = 30;
    const { answered } = this.state;
    if (this.timer === maxTime && !answered) {
      const second = 1000;
      this.timer = setInterval(this.countDown, second);
    }
  }

  handleAnswer() {
    this.setState({ answered: true });
  }

  async handleClick() {
    const maxIndex = 4;
    const { index } = this.state;
    const { propSetNext, propSelectedAnswer } = this.props;
    if (index === maxIndex) {
      this.setState((previousState) => ({
        index: previousState.index,
        answered: false,
        time: 30,
        disabled: false,
        redirect: true,
      }));
    } else {
      this.setState((previousState) => ({
        index: previousState.index + 1,
        answered: false,
        time: 30,
        disabled: false,
      }));
    }
    await propSelectedAnswer(null);
    await propSetNext();
  }

  render() {
    const { results } = this.props;
    const { index, loading, answered, time, disabled, redirect } = this.state;
    const question = results.find((_question, i) => i === index);
    if (redirect) return <Redirect to="/feedback" />;
    return (
      <div className="App">
        <Header />
        <h1>Trivia</h1>
        {
          (!loading) && <Question
            question={ question }
            handleAnswer={ this.handleAnswer }
            disabled={ disabled }
            time={ time }
          />
        }
        <button
          data-testid="btn-next"
          type="button"
          onClick={ this.handleClick }
          hidden={ !answered }
        >
          Próxima
        </button>
        <div>
          { time }
        </div>
      </div>
    );
  }
}

trivia.propTypes = {
  propSetQuestions: PropTypes.func,
}.isRequired;

const mapStateToProps = ({
  actionsReducer: { results, next, selectedAnswer },
  rankingReducer: { token },
}) => ({
  token,
  results,
  next,
  selectedAnswer,
});

const mapDispatchToProps = (dispatch) => ({
  propSetToken: () => dispatch(setToken()),
  propSetQuestions: () => dispatch(setQuestions()),
  propSetNext: () => dispatch(setNext()),
  propSelectedAnswer:
    (selectedAnswer) => dispatch(setSelectedAnswer(selectedAnswer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(trivia);
