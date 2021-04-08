import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getToken, gravatarURL } from '../services/api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      submitButtonEnabled: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSettingsButton = this.handleSettingsButton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.validateFields.bind(this).call();
    });
  }

  validateFields() {
    const { name, email } = this.state;
    const regexCheck = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    this.setState({
      submitButtonEnabled: regexCheck.test(email) && name.length > 0,
    });
  }

  async handleClick() {
    await getToken();
    const { name, email } = this.state;
    // localStorage.setItem('token', token);
    const player = {
      name,
      gravatarEmail: email,
      assertions: 0,
      score: 0,
    };
    localStorage.setItem('player', JSON.stringify(player));
    const myURL = gravatarURL(email);
    localStorage.setItem('gravatarURL', myURL);

    const { history: { push } } = this.props;
    push('/game');
  }

  handleSettingsButton() {
    const { history: { push } } = this.props;
    push('/settings');
  }

  render() {
    const { name, email, submitButtonEnabled } = this.state;
    return (
      <form>
        <label htmlFor="name">
          User Name
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            id="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <label htmlFor="email">
          Gravatar Email
          <input
            type="text"
            name="email"
            data-testid="input-gravatar-email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !submitButtonEnabled }
          onClick={ this.handleClick }
        >
          Começar a Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleSettingsButton }
        >
          Configuração
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
