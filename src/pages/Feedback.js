import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Victory from '../img/trofeu.png';
import GameOver from '../img/perder.png';
import './feedback.css';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.performanceMessage = this.performanceMessage.bind(this);
  }

  performanceMessage(assertions) {
    const baseAssertions = 3;

    if (assertions < baseAssertions) {
      return (
        <div className="feedback-text">
          Podia ser melhor...
          <img className="feedback-image" alt="GameOver" src={ GameOver } />
        </div>
      );
    }

    return (
      <div className="feedback-text">
        Mandou bem!
        <img className="feedback-image" alt="Victory" src={ Victory } />
      </div>);
  }

  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = player;
    const messagePerformance = this.performanceMessage(assertions);
    return (
      <div className="feedback-screen">
        <Header />
        <h3 data-testid="feedback-text">{ messagePerformance }</h3>
        <section className="feedback-component">
          <div>
            <span className="span">Acertou&nbsp;</span>
            <span
              className="span"
              data-testid="feedback-total-question"
            >
              { assertions }
            </span>
            <span className="span">&nbsp;pergunta(s).</span>
          </div>
          <div>
            <span className="span">Um total de&nbsp;</span>
            <span className="span" data-testid="feedback-total-score">{ score }</span>
            <span className="span">&nbsp;pontos</span>
          </div>
        </section>
        <nav className="nav">
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
