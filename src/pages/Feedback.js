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
    return (
      <div>
        <Header />
        {this.menssageFeedBack()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.loginUser.name,
  email: state.loginUser.email,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
