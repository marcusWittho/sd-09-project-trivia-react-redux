import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Rankings extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Rankings</h1>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Tela Inicial</button>
        </Link>
      </div>
    );
  }
}
export default Rankings;
