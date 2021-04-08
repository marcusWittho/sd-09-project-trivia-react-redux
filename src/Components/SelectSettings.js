import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class SelectSettings extends Component {
  constructor() {
    super();

    this.state = {
      btnSettings: 'Setup',
      renderSettings: false,
    };

    this.renderSettings = this.renderSettings.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  changeState() {
    this.setState({
      btnSettings: 'Start with Setup',
      renderSettings: true,
    });
    this.renderSettings();
  }

  renderSettings() {
    return (
      <h2 data-testid="settings-title">Settings</h2>
    );
  }

  render() {
    const { btnSettings, renderSettings } = this.state;
    return (
      <div>
        <button
          className="btn"
          type="button"
          data-testid="btn-settings"
          onClick={ this.changeState }
        >
          { btnSettings }
        </button>
        { renderSettings ? this.renderSettings() : null }
      </div>
    );
  }
}

export default SelectSettings;
