import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      // login: false,
      button: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validateFields();
  }

  validateFields() {
    const { name, email } = this.state;
    if (name.length && email.length > 0) {
      this.setState({
        button: false,
      });
    }
  }

  render() {
    const { name, email, button } = this.state;
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
          disabled={ button }
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
