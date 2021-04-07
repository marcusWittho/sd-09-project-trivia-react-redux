import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import fetchToken from '../services/tokenGenerator';
import { questionsThunk } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      email: '',
      name: '',
      redirect: false,
      redirectToConfig: false,
    };
    this.formGenerator = this.formGenerator.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inputsValidator = this.inputsValidator.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.inputsValidator());
  }

  async handleClick() {
    const { fetchAndSaveQuestions } = this.props;
    const getToken = await fetchToken();
    localStorage.setItem('token', getToken.token);
    fetchAndSaveQuestions();
    this.setState({
      redirect: true,
    });
  }

  inputsValidator() {
    const { email, name } = this.state;
    const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
    if (emailRegex.test(email) && name.length > 0) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  formGenerator() {
    const { isDisabled, email, name } = this.state;
    return (
      <div>
        <label htmlFor="input-player-name">
          Nome:
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            id="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email:
          <input
            type="text"
            name="email"
            data-testid="input-gravatar-email"
            id="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => this.setState({ redirectToConfig: true }) }
        >
          Configurações
        </button>
      </div>
    );
  }

  render() {
    const { redirect, redirectToConfig } = this.state;
    if (redirectToConfig) return <Redirect to="/config" />;
    if (redirect) return <Redirect to="/play" />;
    return (
      <div>
        { this.formGenerator() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAndSaveQuestions: () => dispatch(questionsThunk()),
});

Login.propTypes = {
  fetchAndSaveQuestions: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
