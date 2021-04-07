import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { string, number } from 'prop-types';
import Header from '../Components/Header';
import SelectSettings from '../Components/SelectSettings';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      btnSettings: true,
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.createButton = this.createButton.bind(this);
    this.renderSettings = this.renderSettings.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  clickHandler() {
    // criar restante da função e logicas de fetch
    // return history.push('/trivia');  --- return inicial feito pelo Rodrigo
    return window.location('/trivia');
  }

  changeState() {
    this.setState({
      btnSettings: false,
    });
  }

  createButton() {
    return (
      <button
        className="btn"
        type="button"
        data-testid="btn-settings"
        onClick={ this.changeState }
      >
        Setup
      </button>
    );
  }

  renderSettings() {
    return (
      <div>
        <button
          className="btn"
          type="button"
          data-testid="btn-settings"
        >
          Start with Setup
        </button>
        <SelectSettings />
      </div>
    );
  }

  render() {
    const { btnSettings } = this.state;
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
        { btnSettings ? this.createButton() : this.renderSettings() }
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
