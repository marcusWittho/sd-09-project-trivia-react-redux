import React from 'react';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gravatarEmail: '',
      scoreboard: 0,
    };
  }

  recoveringLocalStorage() {
  }

  render() {
    const { name, gravatarEmail, scoreboard } = this.state;
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
          <p data-testid="header-score">{`Placar: ${scoreboard}`}</p>
        </header>
      </div>
    );
  }
}

export default Feedback;
