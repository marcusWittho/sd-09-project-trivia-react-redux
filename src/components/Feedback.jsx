import React from 'react';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.recoveringLocalStorage = this.recoveringLocalStorage.bind(this);
    this.finalFeedback = this.finalFeedback.bind(this);
    this.feedbackMessage = this.feedbackMessage.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.rankingPage = this.rankingPage.bind(this);
    this.getFromLocalStorage = this.getFromLocalStorage.bind(this);
    this.updateRanking = this.updateRanking.bind(this);
    this.madeButtons = this.madeButtons.bind(this);

    this.state = {
      loginScreen: false,
      rankingScreen: false,
      name: '',
      gravatarEmail: '',
      scoreboard: 0,
    };
  }

  recoveringLocalStorage() {
  }

  finalFeedback() {
    return (
      <p data-testid="feedback-total-score">Placar final</p>
      <p data-testid="feedback-total-question">Total de acertos</p>
  }

  getFromLocalStorage() {
    const responseLocalStorage = JSON.parse(localStorage.getItem('state'));
    const { player: { name, assertions, gravatarEmail } } = responseLocalStorage;

    const ranking = [
      { name, score: assertions, picture: gravatarEmail },
    ];

    return ranking;
  }

  updateRanking() {
    const rankingLocalStorage = JSON.parse(localStorage.getItem('ranking'));

    if (rankingLocalStorage) {
      const ranking = this.getFromLocalStorage();
      console.log(ranking[0]);

      rankingLocalStorage.push(ranking[0]);
      console.log('updateRanking', rankingLocalStorage);

      localStorage.setItem('ranking', JSON.stringify(rankingLocalStorage));
    } else {
      const ranking = this.getFromLocalStorage();
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
  }

  feedbackMessage() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions } } = state;
    const lowScore = 3;
    let response = '';

    if (assertions < lowScore) {
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

  rankingPage() {
    this.updateRanking(); // Apagar depois de configurar a página ranking
    this.setState({
      rankingScreen: true,
    });
  }

  madeButtons() {
    return (
      <>
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
      </>
    );
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

        { this.madeButtons() }

      </div>
    );
  }
}

export default Feedback;
