import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { doLogin } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidName: true,
      invalidEmail: true,
      name: '',
      email: '',
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.validateBtnLogin = this.validateBtnLogin.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }

  enableButton() {
    const { name, email, invalidEmail, invalidName } = this.state;
    if (name === '' && email === '') return true;
    return (invalidEmail || invalidName);
  }

  changeHandler(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  validateBtnLogin() {
    const { name, email } = this.state;
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email.match(regexEmail)) {
      this.setState({ invalidEmail: false });
    } else {
      this.setState({ invalidEmail: true });
    }

    if (name.length !== 0) {
      this.setState({ invalidName: false });
    } else {
      this.setState({ invalidName: true });
    }
  }

  render() {
    const { name, email } = this.state;
    const { doFormLogin } = this.props;
    return (
      <main>
        <form>
          <label htmlFor="input-name">
            <input
              data-testid="input-player-name"
              id="input-name"
              type="text"
              value={ name }
              placeholder="Nome"
              name="name"
              onChange={ (e) => {
                this.changeHandler(e);
                this.validateBtnLogin();
              } }
            />
          </label>

          <label htmlFor="input-email">
            <input
              data-testid="input-gravatar-email"
              id="input-email"
              type="email"
              value={ email }
              placeholder="Email"
              name="email"
              onChange={ (e) => {
                this.changeHandler(e);
                this.validateBtnLogin();
              } }
            />
          </label>

          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.enableButton() }
            onClick={ () => { doFormLogin({ name, email }); } }
          >
            Jogar
          </button>
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  doFormLogin: (obj) => dispatch(doLogin(obj)),
});

const mapStateToProps = (state) => ({
  loginName: state.login.name,
  loginEmail: state.login.Email,
});

Login.propTypes = {
  doFormLogin: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
