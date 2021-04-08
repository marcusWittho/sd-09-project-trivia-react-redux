import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions, fetchToken, ERROR_CODE } from '../redux/actions';
import Question from './Question';

class GamePlay extends React.Component {
  componentDidUpdate() {
    const { token, setQuestions, questions } = this.props;
    console.log(token);
    if ((token && !questions.results) || (questions.response_code === ERROR_CODE)) {
      console.log(token);
      setQuestions(token);
    }
  }

  render() {
    const { questions } = this.props;
    return (
      <div className="main-game-play">
        {
          questions.results || questions.response_code === ERROR_CODE
            ? <Question questionData={ questions } /> : 'Loading...'
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
