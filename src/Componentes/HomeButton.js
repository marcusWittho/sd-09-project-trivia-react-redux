import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeButton extends Component {
  render() {
    return (
      <button
        type="button"
        data-testid="btn-go-home"
        className="home-btn"
      >
        <Link to="/">
          Home
        </Link>
      </button>
    );
  }
}

export default HomeButton;
