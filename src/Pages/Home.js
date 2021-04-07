import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { string, number } from 'prop-types';
import Header from '../Components/Header';

class Home extends Component {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    // criar restante da função e logicas de fetch
    // return history.push('/trivia');  --- return inicial feito pelo Rodrigo
    return window.location('/trivia');
  }

  render() {
    return (
      <div>
        <Header />
        <button
          className="btn"
          type="button"
          onClick={ this.clickHandler }
        >
          Start!
        </button>
      </div>
    );
  }
}

// Home.propTypes = {
//   email: string,
//   name: string,
//   score: number,
// }.isRequired;

const mapStatetoProps = (state) => ({
  // verificar contrução das actions e reducer antes de usar
  email: state.player.email,
  name: state.player.name,
  // score: state.player.score,
});

export default connect(mapStatetoProps)(Home);
