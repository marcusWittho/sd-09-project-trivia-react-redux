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
    const rightQuestions = localStorage.getItem('correctQuestions');
    console.log(rightQuestions);
    const couldBeBetter = 3;
    if (rightQuestions < couldBeBetter) {
      const message = 'Podia ser melhor...';
      return (<p data-testid="feedback-text">{message}</p>);
    }
    const message = 'Mandou bem!';
    return (<p data-testid="feedback-text">{message}</p>);
  }

  render() {
    const { userScore } = this.props;
    console.log(userScore);
    return (
      <div>
        <Header />
        { this.showMessage() }
        <p data-testid="feedback-total-score">{ userScore }</p>
        <p data-testid="feedback-total-question">Voce acertou: perguntas</p>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  userScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  nickname: state.user.nickname,
  userScore: state.game.score,
});

export default connect(mapStateToProps)(Feedback);
