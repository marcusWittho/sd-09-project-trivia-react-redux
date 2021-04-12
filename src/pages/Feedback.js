import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.menssageFeedBack = this.menssageFeedBack.bind(this);
  }

  menssageFeedBack() {
    const numberThree = 3;
    const { assertions } = this.props;
    console.log(typeof (assertions));
    if (assertions < numberThree) {
      console.log(assertions);
      return (<p data-testid="feedback-text">Podia ser melhor...</p>);
    }
    return (<p data-testid="feedback-text">Mandou bem!</p>);
  }

  render() {
    const { score, assertions } = this.props;
    console.log(typeof (score));
    return (
      <div>
        <Header />
        {this.menssageFeedBack()}
        <p data-testid="feedback-total-score">{ `Pontuação Final: ${score}` }</p>
        <p
          data-testid="feedback-total-question"
        >
          { `Número de acertos: ${assertions}` }
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.loginUser.name,
  email: state.loginUser.email,
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
