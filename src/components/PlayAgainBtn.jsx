import React from 'react';

class PlayAgainBtn extends React.Component {
  render() {
    return (
      <button
        type="button"
        onClick={ this.handleClickBtn }
        data-testid="btn-play-again"
      >
        Jogar novamente
      </button>
    );
  }
}

export default PlayAgainBtn;
