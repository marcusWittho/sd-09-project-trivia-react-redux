import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';

const MAGIC_NUMBER = 3;

class Feedback extends React.Component {
  componentDidMount() {
    const { name, email, score } = this.props;
    const emailHash = md5(email).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}`;
    const savedRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    const ranking = {
      name,
      score,
      picture: gravatarUrl,
    };
    if (savedRanking) {
      savedRanking.push(ranking);
    }
    console.log(savedRanking);

    localStorage.setItem('ranking', JSON.stringify(savedRanking));
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <h3 data-testid="feedback-text">
          { assertions >= MAGIC_NUMBER ? 'Mandou bem!' : 'Podia ser melhor...' }
        </h3>
        <h4>
          Placar total:
          <span data-testid="feedback-total-score">{score}</span>
        </h4>
        <h4>
          Você acertou:
          <span data-testid="feedback-total-question">{assertions}</span>
        </h4>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.scoreReducer.assertions,
  score: state.scoreReducer.score,
  name: state.loginReducer.nameInput,
  email: state.loginReducer.emailInput,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
