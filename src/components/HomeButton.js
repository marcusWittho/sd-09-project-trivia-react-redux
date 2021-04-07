import React from 'react';
import { Link } from 'react-router-dom';

class HomeButton extends React.Component {
  render() {
    return (
      <button
        type="button"
        data-testid="btn-go-home"
      >
        <Link
          to={ {
            pathname: '/',
          } }
        >
          Home
        </Link>
      </button>
    );
  }
}

export default HomeButton;
