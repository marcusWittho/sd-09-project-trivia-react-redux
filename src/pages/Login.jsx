import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      userName: '',
      userEmail: '',
    };
  }

  handleChange({ target }) {
    const { state } = this;
    this.setState({
      ...state,
      [target.name]: target.value,
    });
  }

  render() {
    const { userName, userEmail } = this.state;
    const { handleChange } = this;
    return (
      <div>
        <section name="user-login">
          <label htmlFor="userName">
            Nome
            <input
              data-testid="input-player-name"
              name="userName"
              type="text"
              value={ userName }
              onChange={ (e) => handleChange(e) }
            />
          </label>
          <label htmlFor="userEmail">
            Email
            <input
              data-testid="input-gravatar-email"
              name="userEmail"
              type="text"
              value={ userEmail }
              onChange={ (e) => handleChange(e) }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !(userName && userEmail) }
          >
            Jogar
          </button>
        </section>
      </div>
    );
  }
}

export default Login;
