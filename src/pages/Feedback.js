import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.performanceMessage = this.performanceMessage.bind(this);
  }

  performanceMessage(assertions) {
    const baseAssertions = 3;

    if (assertions < baseAssertions) {
      return 'Podia ser melhor...';
    }

    return 'Mandou bem!';
  }

  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = player;
    const messagePerformance = this.performanceMessage(assertions);

    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">{ messagePerformance }</h3>
        <section>
          <div>
            <span>Acertou&nbsp;</span>
            <span data-testid="feedback-total-question">{ assertions }</span>
            <span>&nbsp;perguntas</span>
          </div>
          <div>
            <span>Um total de&nbsp;</span>
            <span data-testid="feedback-total-score">{ score }</span>
            <span>&nbsp;pontos</span>
          </div>
        </section>
        <nav>
          <div>
            <Link to="/">
              <button
                type="button"
                data-testid="btn-play-again"
              >
                Jogar novamente
              </button>
            </Link>
          </div>
          <div>
            <Link to="/ranking">
              <button
                type="button"
                data-testid="btn-ranking"
              >
                Ver Ranking
              </button>
            </Link>
          </div>
        </nav>
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
