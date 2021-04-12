import React from 'react';

class PlayAgainBtn extends React.Component {
  render() {
    // xablau
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
