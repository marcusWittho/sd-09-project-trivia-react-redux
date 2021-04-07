import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { userRegister, fechingTokenToApi } from '../redux/actions';
import logo from '../trivia.png';
import '../App.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      login: false,
      button: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.login = this.login.bind(this);
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

  login() {
    const { name, email } = this.state;
    const { sendUser, fetchUserToken } = this.props;
    sendUser(name, email);
    fetchUserToken();
    this.setState({
      login: true,
    });
  }

  render() {
    const { name, email, login, button } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
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
              onClick={ () => this.login() }
              disabled={ button }
              data-testid="btn-play"
              type="button"
            >
              Jogar
            </button>
            { login ? <Redirect to="/settings" /> : '' }
          </form>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  sendUser: (user, email) => dispatch(userRegister(user, email)),
  fetchUserToken: () => dispatch(fechingTokenToApi()),
});

Login.propTypes = {
  sendUser: PropTypes.func.isRequired,
  fetchUserToken: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
