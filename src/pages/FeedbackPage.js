import React from 'react';
import '../CSS/feedbackPage.css';
import md5 from 'crypto-js/md5';

class feedbackPage extends React.Component {
  getPlayerData() {
    const playerData = JSON.parse(localStorage.getItem('state'));
    return playerData;
  }

  getGravatarImgUrl(email) {
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return url;
  }

  render() {
    const { player: { name, score, gravatarEmail } } = this.getPlayerData();
    console.log(this.getGravatarImgUrl(gravatarEmail));
    return (
      <div>
        <header className="feedback-header">
          <p className="feedback-player-name" data-testid="eader-player-name">{ name }</p>
          <p data-testid="header-score">
            Score:
            {' '}
            { score }
          </p>
          <img
            src={ this.getGravatarImgUrl(gravatarEmail) }
            alt="user"
            data-testid="header-profile-picture"
          />
        </header>
      </div>
    );
  }
}

export default feedbackPage;
