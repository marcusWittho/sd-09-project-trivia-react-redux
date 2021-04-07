import React from 'react';
import PropTypes from 'prop-types';
import { getToken } from '../services/api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      submitButtonEnabled: false,
    };
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
    const token = await getToken();
    localStorage.setItem('token', token);
    const { history: { push } } = this.props;
    push('/game');
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
            onChange={ this.handleChange.bind(this) }
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
            onChange={ this.handleChange.bind(this) }
          />
        </label>
        <br />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !submitButtonEnabled }
          onClick={ this.handleClick.bind(this) }
        >
          Começar a Jogar
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

export default Login;
