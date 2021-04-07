import React, { Component } from 'react';

export default class FeedbackHeader extends Component {
  render() {
    return (
      <header>
        <img data-testid="header-profile-picture" alt={ nomedapessoa } />
        <p data-testid="header-player-name">{ nomedapessoa }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}
