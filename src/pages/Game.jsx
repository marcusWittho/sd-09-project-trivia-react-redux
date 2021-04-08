import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchGameQuestions } from '../actions';

class Game extends React.Component {
  componentDidMount() {
    const { getToken, dispatchQuestions } = this.props;
    dispatchQuestions(getToken.token);
  }

  render() {
    const { getQuestions, isLoading } = this.props;
    console.log(isLoading);
    console.log('questions', getQuestions.questions);
    return isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <div>Game Page</div>
        {getQuestions.questions.results.map((item) => (
          <div key={ item.question }>
            <h2 data-testid="question-category">{item.category}</h2>
            <p data-testid="question-text">{item.question}</p>
            { item.correct_answer && (
              <button
                data-testid="correct-answer"
                type="button"
              >
                {item.correct_answer}
              </button>)}
            { item.incorrect_answers[0] && (
              <button
                data-testid="wrong-answer-0"
                type="button"
              >
                {item.incorrect_answers[0]}
              </button>)}
            { item.incorrect_answers[1] && (
              <button
                data-testid="wrong-answer-1"
                type="button"
              >
                {item.incorrect_answers[1]}
              </button>)}
            { item.incorrect_answers[2] && (
              <button
                data-testid="wrong-answer-1"
                type="button"
              >
                {item.incorrect_answers[2]}
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }
}
Game.propTypes = {
  getToken: PropTypes.objectOf({
    token: PropTypes.string,
  }).isRequired,
  getQuestions: PropTypes.objectOf({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  getToken: state.token,
  isLoading: state.questions.loading,
  getQuestions: state.questions,
});

Game.propTypes = {
  dispatchQuestions: PropTypes.func,
};

Game.defaultProps = {
  dispatchQuestions: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchQuestions: (token) => dispatch(fetchGameQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
