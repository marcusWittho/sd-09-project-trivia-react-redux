import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import settings from '../img/settings.png';
import './configButton.css';

class Configurations extends Component {
  render() {
    return (
      <div className="btn-container">
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
            className="btn"
          >
            <img className="config-img" src={ settings } alt="settings" />
          </button>
        </Link>
      </div>
    );
  }
}

export default Configurations;
