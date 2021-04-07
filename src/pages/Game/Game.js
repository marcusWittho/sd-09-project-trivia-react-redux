import React from 'react';
import { connect } from 'react-redux';
import { string, shape } from 'prop-types';
import fecthAPITrivia from '../../services/apiTriva';
// import MultipleAnswers from '../../components/MultipleAnswers';
// import BooleanAnswers from '../../components/BooleanAnswers';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.fecthAPI = this.fecthAPI.bind(this);
    this.randomAnswer = this.randomAnswer.bind(this);
    this.selectDataTest = this.selectDataTest.bind(this);

    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.fecthAPI();
  }

  async fecthAPI() {
    const token = localStorage.getItem('token');
    const questions = await fecthAPITrivia(token);
    this.setState({
      questions: questions.results,
    });
  }

  selectDataTest(option, index) {
    const { questions } = this.state;
    if (questions.length && questions[0].correct_answer !== option) {
      return `wrong-answer-${index}`;
    }
    return 'correct-answer';
  }

  randomAnswer(questions) {
    if (questions.length) {
      const optionAnswers = questions[0].incorrect_answers;
      const maxNumber = 4;
      optionAnswers
        .splice(Math.floor(Math.random() * maxNumber), 0, questions[0].correct_answer);
      return optionAnswers;
    }
  }

  render() {
    const { player } = this.props;
    const { questions } = this.state;
    const optionAnswers = this.randomAnswer(questions);
    let index = 0;
    return (
      <section className="game-container">
        <header>
          <img
            src={ player.gravatarEmail }
            alt={ `Avatar ${player.name}` }
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ player.name }</p>
          <p data-testid="header-score">0</p>
        </header>
        <main className="main-container">
          <div className="answers">
            <div className="question-container">
              <h3 className="question-category" data-testid="question-category">
                { questions.length && questions[0].category }
              </h3>
              <p data-testid="question-text">{ questions.length && questions[0].question }</p>
            </div>
            { optionAnswers && optionAnswers.map((option) => {
              const dataTestId = this.selectDataTest(option, index);
              if (dataTestId !== 'correct-answer') index += 1;
              return (
                <button
                  type="button"
                  key={ option }
                  data-testid={ dataTestId }
                >
                  { option }
                </button>);
            })}
          </div>
        </main>
      </section>
    );
  }
}

const mapStateToProps = ({ playerReducer }) => ({
  player: playerReducer.player,
});

Game.propTypes = {
  player: shape({
    name: string,
    gravatarEmail: string,
    assertions: string,
    score: string,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
