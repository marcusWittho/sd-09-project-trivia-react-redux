import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      login: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;
    return (
      <form>
        <label htmlFor="inputName">
          Nome
          <input
            type="text"
            data-testid="input-player-name"
            id="inputName"
            onChange={ this.handleChange }
            value={ name }
            name="name"
          />
        </label>
        <label htmlFor="inputEmail">
          Email
          <input
            type="email"
            data-testid="input-gravatar-email"
            id="inputEmail"
            onChange={ this.handleChange }
            value={ email }
            name="email"
          />
        </label>
        <button
          onClick=""
          data-testid="btn-play"
          type="button"
        >
          Jogar
        </button>
      </form>
    );
  }
}
export default Login;
