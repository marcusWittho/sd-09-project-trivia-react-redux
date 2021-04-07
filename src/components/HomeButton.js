import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <section>
        <button
          type="button"
          data-testid="btn-go-home"
        >
          <Link to="/">
            Home
          </Link>
        </button>

      </section>

    );
  }
}

export default Ranking;
