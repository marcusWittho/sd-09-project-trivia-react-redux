import React from 'react';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginScreen: false,
      rankingScreen: false,
    };

    this.feedbackMessage = this.feedbackMessage.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.rankingPage = this.rankingPage.bind(this);
    this.mockLocalStorage = this.mockLocalStorage.bind(this);
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

  // Apagar depois de configurar a página ranking
  mockLocalStorage() {
    const ranking = [
      { name: 'name1', score: 5, picture: 'email1' },
    ];

    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  rankingPage() {
    this.mockLocalStorage(); // Apagar depois de configurar a página ranking
    this.setState({
      rankingScreen: true,
    });
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { name, gravatarEmail, score } } = state;
    const { loginScreen, rankingScreen } = this.state;

    if (loginScreen) return <Redirect to="/" />;
    if (rankingScreen) return <Redirect to="/ranking" />;

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

        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.rankingPage }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

export default Feedback;
