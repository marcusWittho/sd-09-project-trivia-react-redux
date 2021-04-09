import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions, updateIndex } from '../actions';
import Header from '../Componentes/Header';
import Question from '../Componentes/Question';

class Game extends React.Component {
  componentDidMount() {
    const { storeQuestions, token } = this.props;
    storeQuestions(token);
  }

  render() {
    const { questions, index, incremanteIndex } = this.props;
    return (
      <div>
        <Header />
        <div>
          <div>
            {questions.map((question, index1) => (
              index === index1 ? <Question key={ index1 } question={ question } /> : null
            ))}
          </div>

          <button
            data-testid="btn-next"
            type="button"
            onClick={ () => incremanteIndex(index + 1) }
          >
            Próxima
          </button>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  storeQuestions: PropTypes.func.isRequired,
  incremanteIndex: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  storeQuestions: (token) => dispatch(fetchQuestions(token)),
  incremanteIndex: (index) => dispatch(updateIndex(index)),
});

const mapStateToProps = (state) => ({
  token: state.player.token,
  index: state.player.index,
  questions: state.data.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
