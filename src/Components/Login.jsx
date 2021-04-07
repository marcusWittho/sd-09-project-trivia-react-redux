import React from 'react';
import '../App.css';
import loginPanel from './loginPanel.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.changeState = this.changeState.bind(this);
  }

  changeState({ target: { id, value } }) {
    this.setState(() => ({ [id]: value }));
  }

  fields() {
    return (
      <>
        <label htmlFor="login-email">
          Email
          <br />
          <input
            data-testid="input-gravatar-email"
            type="text"
            placeholder="example@mail.com"
            id="login-email"
            onChange={ this.changeState }
            required
          />
        </label>
        <label htmlFor="login-name">
          Nome
          <br />
          <input
            data-testid="input-player-name"
            type="text"
            placeholder="Jogador1"
            id="login-name"
            onChange={ this.changeState }
            required
          />
        </label>
        <br />
        <input
          data-testid="btn-play"
          type="button"
          value="Jogar"
          className="login-button"
        />
      </>
    );
  }

  render() {
    return (
      <main>
        <article>
          <h1 className="title-main">Bem vindos ao jogo Trivia</h1>
          <p>
            Teste e aumente seus conhecimentos com milhares de perguntas,
            <br />
            perguntas no estilo clássico de 4 alternativas, verdadeiro/falso,
            <br />
            bandeiras, enigmas sobre pontos turísticos, e muito mais.
          </p>
          <p>
            No game, o jogador pode testar os seus conhecimentos em diversas
            <br />
            categorias, como Literatura, Entretenimento, História e Ciências.
          </p>
          <h2>Coloque seu e-mail e nome para participar do jogo</h2>
          <form className="login-form">
            { this.fields(this.changeState) }
          </form>
        </article>
        <img src={ loginPanel } alt="Painel de Login" className="login-img" />
      </main>
    );
  }
}

export default Login;
