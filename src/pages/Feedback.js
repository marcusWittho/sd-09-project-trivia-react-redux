import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.performanceMessage = this.performanceMessage.bind(this);
    this.assertionsMessage = this.assertionsMessage.bind(this);
    this.scoreMessage = this.scoreMessage.bind(this);
  }

  performanceMessage(assertions) {
    const baseAssertions = 3;

    if (assertions < baseAssertions) {
      return 'Podia ser melhor...';
    }

    return 'Mandou bem!';
  }

  assertionsMessage(assertions) {
    if (assertions === 0) {
      return 'Você não acertou em nenhuma questão!';
    }
    if (assertions === 1) {
      return 'Você não acertou 1 questão!';
    }
    return `Você acertou ${assertions} questões!`;
  }

  scoreMessage(score) {
    if (score <= 1) {
      return `Um total de ${score} ponto`;
    }
    return `Um total de ${score} pontos`;
  }

  render() {
    const { player } = this.props;
    console.log(player);
    const { assertions, score } = player;
    // localStorage.setItem('state', JSON.stringify(player));
    const messagePerformance = this.performanceMessage(assertions);
    const messageAssertions = this.assertionsMessage(assertions);
    const messageScore = this.scoreMessage(score);
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">{ messagePerformance }</h3>
        <section>
          <p data-testid="feedback-total-question">{ messageAssertions }</p>
          <p data-testid="feedback-total-score">{ messageScore }</p>
        </section>
        <section>
          <div>
            <Link to="/jogo">
              <button
                type="button"
                data-testid="btn-play-again"
              >
                Jogar novamente
              </button>
            </Link>
          </div>
          <div>
            <Link to="/game">
              <button
                type="button"
                data-testid="btn-ranking"
              >
                Ver Ranking
              </button>
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

Feedback.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(Feedback);
