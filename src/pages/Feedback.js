import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.showMessage = this.showMessage.bind(this);
  }

  showMessage() {
    // localStorage.setItem('state', JSON.stringify({ player: { correctQuestions: correctQuestions } }))
    const rightQuestions = localStorage.getItem('correctQuestions');
    console.log(rightQuestions)
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
    return (
      <div>
        <Header />
        { this.showMessage() }
        <p data-testid="feedback-total-score">{ userScore }</p>
        <p data-testid="feedback-total-question">Voce acertou: perguntas</p>
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
  userScore: state.score.currentScore,
});

export default connect(mapStateToProps)(Feedback);
