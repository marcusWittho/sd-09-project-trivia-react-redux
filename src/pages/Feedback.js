import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.showMessage = this.showMessage.bind(this);
  }

  showMessage() {
    const storageState = JSON.parse(localStorage.getItem('state'));
    const rightQuestions = storageState.player.assertions;
    const couldBeBetter = 3;
    if (rightQuestions < couldBeBetter) {
      const message = `Podia ser melhor... ${rightQuestions}`;
      return (<p data-testid="feedback-text">{message}</p>);
    }
    const message = 'Mandou bem!';
    return (<p data-testid="feedback-text">{message}</p>);
  }

  render() {
    const { userScore, assertions } = this.props;
    return (
      <div>
        <Header />
        { this.showMessage() }
        <p data-testid="feedback-total-score">{ userScore }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  userScore: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  nickname: state.user.nickname,
  userScore: state.game.score,
  assertions: state.game.assertions,
});

export default connect(mapStateToProps)(Feedback);
