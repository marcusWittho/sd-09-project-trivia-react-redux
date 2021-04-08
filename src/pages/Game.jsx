import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Game extends Component {
  render() {
    return (
      <span>
        olá
        <span>
          <Link to="/feedback">feedback</Link>
        </span>
      </span>
    );
  }
}

export default Game;
