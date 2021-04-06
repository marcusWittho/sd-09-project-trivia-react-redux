import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      validated: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validateInputs();
  }

  validateInputs() {
    const { name, email } = this.state;
    if (name && email) {
      this.setState({
        validated: false,
      });
    }
  }

  render() {
    const { validated } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <label htmlFor="email">
            Email:
            <input
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <button
            disabled={ validated }
            type="button"
            data-testid="btn-play"
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
