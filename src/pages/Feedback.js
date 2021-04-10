import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { number, func } from 'prop-types';
import { Header } from '../components';
import { clearUserData } from '../actions';
import './Feedback.css';

class FeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.getFeedback = this.getFeedback.bind(this);
    this.localStorage = this.localStorage.bind(this);
  }

  getFeedback() {
    const { correct } = this.props;
    const minScore = 3;
    if (correct >= minScore) return 'Mandou bem!';
    return 'Podia ser melhor...';
  }

  localStorage() {
    const { correct, clearUser } = this.props;
    const player = JSON.parse(localStorage.getItem('state'));
    const token = localStorage.getItem('token');
    let ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking === null) ranking = [];
    const rankingNew = [...ranking, {
      assertions: correct,
      name: player.player.name,
      score: player.player.score,
      picture: token,
    }];
    rankingNew.sort((a, b) => {
      const one = 1;
      if (a.score < b.score) return one;
      if (a.score > b.score) return -one;
      return 0;
    });
    localStorage.setItem('ranking', JSON.stringify(rankingNew));
    clearUser();
  }

  render() {
    const { score, correct } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{ this.getFeedback() }</p>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ correct }</p>
        <Link to="/" onClick={ this.localStorage }>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.handleClick }
          >
            Play Again
          </button>
        </Link>
        <Link to="ranking" onClick={ this.localStorage }>
          <button data-testid="btn-ranking" type="button">
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}

FeedBack.propTypes = {
  score: number,
  correct: number,
  clearUser: func,
}.isRequired;

const mapStateToProps = ({ user: { score, correct } }) => ({ score, correct });

const mapDispatchToProps = (dispatch) => ({
  clearUser: () => dispatch(clearUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
