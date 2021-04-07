import React from 'react';
import { StartGameButton, ButtonDefinitions } from './index';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.handleInputs = this.handleInputs.bind(this);
    this.state = {
      buttonStatus: true,
    };
  }

  handleInputs() {
    const { buttonStatus } = this.state;
    const nameValue = document.getElementById('name-input').value;
    const emailValue = document.getElementById('email-input').value;
    if (emailValue !== ''  && nameValue !== '' && buttonStatus === true) {
      this.setState({
        buttonStatus: false,
      });
    } else if ((emailValue === '' || nameValue === '') && buttonStatus === false) {
      this.setState({
        buttonStatus: true,
      });
    }
  }

  render() {
    const { buttonStatus } = this.state;
    return (
      <form>
        <label htmlFor="name-input">
          Nome:
          <input
            onChange={ this.handleInputs }
            type="text"
            id="name-input"
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email-input">
          Email:
          <input
            onChange={ this.handleInputs }
            type="text"
            id="email-input"
            data-testid="input-gravatar-email"
          />
        </label>
        <StartGameButton buttonStatus={ buttonStatus } />
        <ButtonDefinitions />
      </form>
    );
  }
}

export default LoginForm;
