import React from 'react';
import { Redirect } from 'react-router-dom';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goHome: false,
    };
  }

  render() {
    const { goHome } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          onClick={ () => this.setState({ goHome: true }) }
          data-testid="btn-play-again"
        >
          Jogar novamente
        </button>
        { goHome ? <Redirect to="/" /> : '' }
      </div>
    );
  }
}

export default Ranking;
