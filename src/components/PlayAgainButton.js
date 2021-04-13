import React, { Component } from 'react';
import { Redirect } from 'react-router';

class PlayAgainButton extends Component {
  constructor() {
    super();
    this.state = { redirect: false };
    this.playAgainClick = this.playAgainClick.bind(this);
  }

  playAgainClick() { this.setState({ redirect: true }); }

  render() {
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/" />;
    return (
      <button
        type="button"
        data-testid="btn-play-again"
        onClick={ this.playAgainClick }
      >
        Jogar novamente
      </button>
    );
  }
}

export default PlayAgainButton;
