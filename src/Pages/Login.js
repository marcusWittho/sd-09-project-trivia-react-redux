import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { playerLogin } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      disableBtn: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      this.handleLogin();
    });
  }

  handleLogin() {
    const { email, name } = this.state;
    const { dispatchNameEmail } = this.props;
    if (email.length > 0 && name.length > 0) {
      this.setState({
        disableBtn: false,
      });
      dispatchNameEmail(email, name);
    } else {
      this.setState({
        disableBtn: true,
      });
    }
  }

  render() {
    const { email, name, disableBtn } = this.state;
    return (
      <div>
        <input
          data-testid="input-player-name"
          type="text"
          name="name"
          value={ name }
          onChange={ this.handleChange }
          placeholder="Informe seu nome"
          autoComplete="off"
        />
        <input
          data-testid="input-gravatar-email"
          type="text"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          placeholder="Informe seu email"
          autoComplete="off"
        />
        <Link to="/home">
          <button
            data-testid="btn-play"
            type="button"
            disabled={ disableBtn }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchNameEmail: (email, name) => dispatch(playerLogin(email, name)),
});

Login.propTypes = {
  dispatchNameEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
