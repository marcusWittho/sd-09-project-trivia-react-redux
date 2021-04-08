import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions, fetchToken, ERROR_CODE } from '../redux/actions';
import Question from './Question';
import './GamePaly.css';

class GamePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxQuestions: 4,
      currentQuestion: 0,
    };
    this.showNextQuestion = this.showNextQuestion.bind(this);
  }

  componentDidUpdate() {
    const { token, setQuestions, questions } = this.props;
    if ((token && !questions.results) || (questions.response_code === ERROR_CODE)) {
      console.log(token);
      setQuestions(token);
    }
  }

  showNextQuestion() {
    const { maxQuestions } = this.state;
    let { currentQuestion } = this.state;
    if (currentQuestion < maxQuestions) {
      currentQuestion += 1;
      this.setState({
        currentQuestion,
      });
    }
  }

  render() {
    const { questions } = this.props;
    const { results } = questions;
    const { currentQuestion } = this.state;
    return (
      <div className="main-game-play">
        {
          questions.results || questions.response_code === ERROR_CODE
            ? (
              <Question
                question={ results[currentQuestion] }
                showNextQuestion={ this.showNextQuestion }
              />
            )
            : 'Loading...'
        }
      </div>
    );
  }
}
GamePlay.propTypes = {
  questions: PropTypes.shape().isRequired,
  setQuestions: PropTypes.func.isRequired,
  token: PropTypes.shape().isRequired,
};

const mapStatetoProps = (state) => ({
  token: state.triviaReducer.token,
  questions: state.triviaReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  setQuestions: (token) => dispatch(fetchQuestions(token.token)),
  setToken: () => dispatch(fetchToken()),
});
export default connect(mapStatetoProps, mapDispatchToProps)(GamePlay);
