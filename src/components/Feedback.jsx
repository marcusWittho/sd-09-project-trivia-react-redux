import React from 'react';
import md5 from 'crypto-js/md5';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { score } } = state;
    const lowScore = 3;
    let response = '';

    if (score < lowScore) {
      response = <h2 data-testid="feedback-text">Podia ser melhor...</h2>;
    } else {
      response = <h2 data-testid="feedback-text">Mandou bem!</h2>;
    }

    return response;
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { name, gravatarEmail, score } } = state;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
            alt="Gravatar"
          />

          <p data-testid="header-player-name">
            Jogador:
            {name}
          </p>

          <p data-testid="header-score">{ score }</p>

          { this.feedbackMessage() }
        </header>
      </div>
    );
  }
}

export default Feedback;
