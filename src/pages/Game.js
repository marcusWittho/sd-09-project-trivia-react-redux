import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions, updateIndex } from '../actions';
import Header from '../Componentes/Header';
import Question from '../Componentes/Question';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeToAnswer: 30,
      step: 1000,
      disableBtn: false,
    };

    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    const { storeQuestions, token } = this.props;
    storeQuestions(token);
    this.timer();
  }

  timer() {
    const { timeToAnswer, step } = this.state;
    let timeLimit = timeToAnswer;
    const timeLeft = setInterval(() => {
      this.setState({
        timeToAnswer: timeLimit - 1,
      });
      timeLimit -= 1;
      if (timeLimit === 0) {
        this.setState({
          disableBtn: true,
        });
        clearInterval(timeLeft);
      }
    }, step);
  }

  nextQuestion() {
    const { index, incremanteIndex } = this.props;
    incremanteIndex(index + 1);
  }

  render() {
    const { questions, index, isAnswered } = this.props;
    const { timeToAnswer, disableBtn } = this.state;
    return (
      <div>
        <Header />
        <p>{`Timer: ${timeToAnswer}`}</p>
        <div>
          <div>
            {questions.map((question, index1) => (
              index === index1 ? <Question
                key={ index1 }
                question={ question }
                disableBtn={ disableBtn }
                timer={ timeToAnswer }
              /> : null
            ))}
          </div>

          {isAnswered && <button
            data-testid="btn-next"
            type="button"
            onClick={ () => this.nextQuestion() }
          >
            Próxima
          </button>}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isAnswered: PropTypes.bool.isRequired,
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
  isAnswered: state.player.isAnswered,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
