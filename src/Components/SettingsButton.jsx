import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Login.css';

class SettingsButton extends Component {
  render() {
    return (
      <Link to="/settings">
        <button
          data-testid="btn-settings"
          type="button"
          className="btn-settings"
        >
          Settings
        </button>
      </Link>
    );
  }
}

export default SettingsButton;
