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
    const { questions } = this.props;
    return (
      <main>
        <p
          data-testid="question-category"
        >
          Categoria:
          { questions[1].category }
        </p>
        <p data-testid="question-text">Pergunta</p>
        <button data-testid="correct-answer">Alternativa 1</button>
        <button data-testid="wrong-answer-0">Alternativa 2</button>
        <button data-testid="wrong-answer-1">Alternativa 3</button>
        <button data-testid="wrong-answer-2">Alternativa 4</button>
      </main>

    );
  }
}

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
