import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchToken } from '../redux/actions';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameInput: '',
      emailInput: '',
      disabledButton: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { nameInput, emailInput } = this.state;
      if (nameInput.length > 0 && emailInput.length > 0) {
        this.setState({
          disabledButton: false,
        });
      } else {
        this.setState({
          disabledButton: true,
        });
      }
    });
  }

  handleClick() {
    const { getToken } = this.props;
    getToken();
  }

  renderNameInput() {
    const { nameInput } = this.state;
    return (
      <label htmlFor="name-input">
        Nome:
        <input
          data-testid="input-player-name"
          type="text"
          id="name-input"
          name="nameInput"
          value={ nameInput }
          onChange={ this.handleChange }
          autoComplete="off"
        />
      </label>
    );
  }

  renderEmailInput() {
    const { emailInput } = this.state;
    return (
      <label htmlFor="email-input">
        Email:
        <input
          data-testid="input-gravatar-email"
          type="email"
          id="email-input"
          name="emailInput"
          value={ emailInput }
          onChange={ this.handleChange }
          autoComplete="off"
        />
      </label>
    );
  }

  render() {
    const { nameInput, emailInput, disabledButton } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <main>
          <h1>Login</h1>
          { this.renderNameInput() }
          { this.renderEmailInput() }
          <Link
            to={ { pathname: '/trivia', player: { email: emailInput, name: nameInput } } }
          >
            <button
              data-testid="btn-play"
              type="button"
              disabled={ disabledButton }
              onClick={ this.handleClick }
            >
              Jogar
            </button>
          </Link>
          <Link to="/config">
            <button type="button" data-testid="btn-settings">Configurações</button>
          </Link>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getToken: fetchToken,
};

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
