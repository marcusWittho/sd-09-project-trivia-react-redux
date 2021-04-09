import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SettingsButton extends Component {
  render() {
    return (
      <Link to="/settings">
        <button
          data-testid="btn-settings"
          type="button"
        >
          Settings
        </button>
      </Link>
    );
  }
}

export default SettingsButton;
