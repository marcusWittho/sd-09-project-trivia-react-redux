import React from 'react';
import { Link } from 'react-router-dom';

class GoHome extends React.Component {
  render() {
    return (
      <Link to="/">
        <button
          data-testid="btn-go-home"
          type="button"
          className="App-link"
        >
          Página inicial
        </button>
      </Link>
    );
  }
}

export default GoHome;
