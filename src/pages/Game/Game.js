import React from 'react';
import { connect } from 'react-redux';
import { string, shape, arrayOf, bool } from 'prop-types';
import { Redirect } from 'react-router';
import actionAddQuestions from '../../redux/actions/actionAddQuestion';
import MultipleAnswers from '../../components/MultipleAnswers';
import BooleanAnswers from '../../components/BooleanAnswers';
import Loading from '../../components/Loading/Loading';
import './Game.css';

class Game extends React.Component {
  render() {
    const { player, questions, isFetching } = this.props;
    const { validLogin } = player;
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
            { (questions) && questions.map((question) => (
              (question.type === 'multiple')
                ? <MultipleAnswers question={ question } />
                : <BooleanAnswers question={ question } />
            ))[0] }
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
});

const mapDispatchToProps = {
  actionAddQuestions,
};

Game.propTypes = {
  player: shape({
    name: string,
    gravatarEmail: string,
    assertions: string,
    score: string,
  }).isRequired,
  questions: arrayOf(shape()).isRequired,
  isFetching: bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
