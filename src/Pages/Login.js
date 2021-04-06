import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateMail = this.validateMail.bind(this);
}

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validateMail(email) {
    const emailRegex = /^([\w.-]+)@([\w-]+)((.(\w){2,3})+)$/;
    return emailRegex.test(email);
  }

  clickHandler() {
    const { history, actionAserCriada } = this.props;
    const { email, name } = this.state;
    actionAserCriada(email, name);
    if (this.validate()) history.push('/home');
  }


  render() {
    const { email, name } = this.state;
    return (
      <div>
        <input
          placeholder="Insert your name"
          name="name"
          type="text"
          value={ name }
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <input
        placeholder="Insert your E-mail"
        name="email"
        type="email"
        value={ email }
        data-testid="input-gravatar-email"
        onChange={ this.handleChange }
        />
        <button
        className="btn"
        type="button"
        onClick={ this.clickHandler }
        disabled={ !this.validateMail() }
        >
          Entrar
        </button>
    </div>
  )}
}

Login.propTypes = {
  actionAserCriada: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  actionAserCriada: (email, name) => dispatch(actionAserCriada(email, name)),
});

export default connect(null, mapDispatchToProps)(Login);