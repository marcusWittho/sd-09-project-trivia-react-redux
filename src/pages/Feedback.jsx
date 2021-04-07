import React, { Component } from 'react';

class Feedback extends Component {
  render() {
    return (
      <div>
        <header>
          <span data-testid="header-profile-picture"></span>
          <span data-testid="header-player-name"></span>
          <span data-testid="header-score"></span>
        </header>
      </div>
    );
  }
}

export default Feedback;
