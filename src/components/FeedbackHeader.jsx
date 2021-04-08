import React, { Component } from 'react';

export default class FeedbackHeader extends Component {
  render() {
    return (
      <header className="feedback-header">
        <div className="header-left">
          <img
            data-testid="header-profile-picture"
            alt=""
            src=""
            className="header-profile-picture"
          />
          <span
            data-testid="header-player-name"
            className="header-player-name"
          >
            Nome jogador
          </span>
        </div>
        <span
          data-testid="header-score"
          className="header-score"
        >
          0
        </span>
      </header>
    );
  }
}
