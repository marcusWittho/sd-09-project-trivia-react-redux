import React, { Component } from 'react';
import '../Styles/Settings.css';

class Settings extends Component {
  render() {
    return (
      <h2
        data-testid="settings-title"
        className="settings-title"
      >
        Configurações
      </h2>
    );
  }
}

export default Settings;
