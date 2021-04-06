import { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class SettingsButton extends Component {
  render() {
    return (
      <button
        data-testid = "btn-settings"
        type="button"
        onClick={ <Redirect to="/settings" /> }
      >
        Settings
      </button>
    )
  }
}
