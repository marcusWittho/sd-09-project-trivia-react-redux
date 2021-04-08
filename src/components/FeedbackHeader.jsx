import React, { Component } from 'react';

export default class FeedbackHeader extends Component {
  render() {
    return (
      <header>
        <img data-testid="header-profile-picture" alt="" src="" />
        <p data-testid="header-player-name">Nome jogador</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}
