import React from "react";

class SettingsButton extends React.Component {
  render() {
    return (
      <div>
        <Link to="./settings">
          <button data-testid="btn-settings">Settings</button>
        </Link>
      </div>
    );
  }
}

export default SettingsButton;
