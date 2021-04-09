import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions/game';

class Questions extends React.Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  render() {
    const { questions, isLoading } = this.props;
    if (isLoading === true) return (<h1>Loading...</h1>);
    return (
      <main>
        <div>
          { questions.map((question) => (
            <div>
              <h3 data-testid="question-category">{question.category}</h3>
              <h3 data-testid="question-text">{question.question}</h3>
              <button type="button">{question.correct_answer}</button>
              {(question.incorrect_answers).map((option, index) => (
                <button
                  type="button"
                  key={ index }
                  data-testid={ `wrong-answer-${index}` }
                >
                  { option }
                </button>
              ))}
            </div>
          ))}
        </div>
      </main>

    );
  }
}

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  isLoading: state.game.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
