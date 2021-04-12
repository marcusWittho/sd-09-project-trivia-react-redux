import React from 'react';
import HomeButton from '../Componentes/HomeButton';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <HomeButton />
      </div>
    );
  }
}

export default Ranking;
