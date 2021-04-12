import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeButton extends Component {
  render() {
    return (
      <button
        type="button"
        className="home-btn"
        data-testid="btn-go-home"
      >
        <Link to="/">
          Home
        </Link>
      </button>
    );
  }
}

export default HomeButton;
