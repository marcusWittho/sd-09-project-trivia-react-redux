import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/header';
import { setRanking } from '../redux/actions';

class feedback extends React.Component {
  mandouBem() {
    return (
      <h1 data-testid="feedback-text">Mandou bem!</h1>
    );
  }

  podiaSerMelhor() {
    return (
      <h1 data-testid="feedback-text">Podia ser melhor...</h1>
    );
  }

  saveRanking() {
    const { propSetRanking } = this.props;
    const { player: {
      name,
      score,
      gravatar,
      assertions,
    } } = JSON.parse(localStorage.getItem('state'));
    const rankingStorage = {
      name,
      score,
      gravatar,
      assertions,
    };
    if (!localStorage.getItem('ranking')) {
      const rankingArrStorage = [rankingStorage];
      propSetRanking(rankingArrStorage);
      const rankingArrStorageString = JSON.stringify(rankingArrStorage);
      localStorage.setItem('ranking', rankingArrStorageString);
    } else {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      ranking.push(...[rankingStorage]);
      propSetRanking(ranking);
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
  }

  render() {
    const { score, assertions } = this.props;
    this.saveRanking();
    const half = 3;
    return (
      <div>
        <Header />
        <div className="App-header">
          <span>
            { assertions < half
              ? this.podiaSerMelhor()
              : this.mandouBem() }
          </span>
          <p data-testid="feedback-total-score">
            { `${score} pontos` }
          </p>
          <p data-testid="feedback-total-question">
            { `${assertions} acertos` }
          </p>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">
              Jogar novamente
            </button>
          </Link>
          <Link to="/ranking">
            <button type="button" data-testid="btn-ranking">
              Ver Ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ actionsReducer: { score, assertions } }) => ({
  score,
  assertions,
});

const mapDispatchToProps = (dispatch) => ({
  propSetRanking: (ranking) => dispatch(setRanking(ranking)),
});

export default connect(mapStateToProps, mapDispatchToProps)(feedback);
