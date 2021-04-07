import React from 'react';
import { Link } from 'react-router-dom';

class HomeButton extends React.Component {
  render() {
    return (
      <Link to="/">
        <button
          type="button"
          data-testid="btn-go-home"
        >
          Home
        </button>
      </Link>
    );
  }
}

export default HomeButton;
