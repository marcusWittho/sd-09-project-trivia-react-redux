import React from 'react';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginScreen: false,
    };

    this.feedbackMessage = this.feedbackMessage.bind(this);
    this.playAgain = this.playAgain.bind(this);
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

  playAgain() {
    this.setState({
      loginScreen: true,
    });
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { name, gravatarEmail, score } } = state;
    const { loginScreen } = this.state;

    if (loginScreen) return <Redirect to="/" />;

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

        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.playAgain }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

export default Feedback;
