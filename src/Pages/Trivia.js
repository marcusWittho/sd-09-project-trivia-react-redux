import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';
import Header from '../Components/Header';
import TriviaCards from '../Components/TriviaCards';

class Trivia extends Component {
  render() {
    const { email, total, score } = this.props;
    return (
      <div>
        <Header email={ email } total={ total } score={ score } />
        <TriviaCards />
      </div>
    );
  }
}

Trivia.propTypes = {
  email: string,
  total: string,
  score: number,
}.isRequired;

const mapStatetoProps = (state) => ({
  email: state.user.email,
  total: state.user.total,
  score: state.user.total,
});

export default connect(mapStatetoProps)(Trivia);
