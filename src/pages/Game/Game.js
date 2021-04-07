import React from 'react';
import { connect } from 'react-redux';
import { string, shape, arrayOf, bool, number } from 'prop-types';
import { Redirect } from 'react-router';
// import actionAddQuestions from '../../redux/actions/actionAddQuestion';
import actionResetCounter from '../../redux/actions/actionResetCounter';
import MultipleAnswers from '../../components/MultipleAnswers';
import BooleanAnswers from '../../components/BooleanAnswers';
import Loading from '../../components/Loading/Loading';
import actionDisableButton from '../../redux/actions/actionDisableButton';
import ShowButton from '../../redux/actions/actionShowButton';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  // Fazer a verificação, se a questão foi marcada então passe para a próxima
  handleNextQuestion() {
    const { ResetCounter, DisableButton, StateShowButton } = this.props;
    ResetCounter();
    DisableButton(false);
    StateShowButton(false);
    this.setState((previousState) => ({
      counter: previousState.counter + 1,
    }));
  }

  render() {
    const { player, questions, isFetching, showButton } = this.props;
    const { validLogin } = player;
    const { counter } = this.state;
    if (!validLogin) return <Redirect exact to="/" />;
    if (isFetching || !questions) return <Loading />;
    return (
      <section className="game-container">
        <header>
          <img
            src={ player.gravatarEmail }
            alt={ `Avatar ${player.name}` }
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ player.name }</p>
          <p data-testid="header-score">Score: 0</p>
        </header>
        <main className="main-container">
          <div className="answers">
            { (questions) && questions.map((question, index) => {
              if (counter === index) {
                return (question.type === 'multiple')
                  ? <MultipleAnswers question={ question } />
                  : <BooleanAnswers question={ question } />;
              }
            }) }
            {(showButton) && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ () => this.handleNextQuestion() }
              >
                Próxima
              </button>
            )}

          </div>
        </main>
      </section>
    );
  }
}

const mapStateToProps = ({ playerReducer, questionsReducer }) => ({
  player: playerReducer.player,
  questions: questionsReducer.questions,
  isFetching: questionsReducer.isFetching,
  showButton: questionsReducer.showButtonNextQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  ResetCounter: () => dispatch(actionResetCounter()),
  DisableButton: (value) => dispatch(actionDisableButton(value)),
  StateShowButton: (value) => dispatch(ShowButton(value)),
});

Game.propTypes = {
  player: shape({
    name: string,
    gravatarEmail: string,
    assertions: string,
    score: string,
  }).isRequired,
  questions: arrayOf(shape()).isRequired,
  isFetching: bool.isRequired,
  showButton: bool.isRequired,
  ResetCounter: number.isRequired,
  DisableButton: bool.isRequired,
  StateShowButton: bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
