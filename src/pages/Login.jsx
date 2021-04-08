import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { getToken } from '../services/triviaApi';
import { handlePlayerData } from '../redux/actions';
import './css/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      email: '',
      disableButton: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
  }

  async fetchToken() {
    const { user, email } = this.state;
    const { propHandlePlayerData } = this.props;
    const token = await getToken();
    const data = { user, email, token };
    propHandlePlayerData(data);

    localStorage.setItem('player', {
      name: '', assertions: '', score: '', gravatarEmail: '',
    });
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value }, () => {
      const { user, email } = this.state;
      const regex = /\S+@\S+\.\S+/;
      const min = 0;
      if (regex.test(email) && user.length > min) {
        this.setState({ disableButton: false });
      } else this.setState({ disableButton: true });
    });
  }

  render() {
    const { disableButton } = this.state;
    return (
      <div className="form-login">
        <form className="fieldset-login">
          <label htmlFor="enter-name">
            Nome:
            <input
              id="enter-name"
              data-testid="input-player-name"
              type="text"
              name="user"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="enter-email" className="label-login">
            E-mail:
            <input
              id="enter-email"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disableButton }
            onClick={ this.fetchToken }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  propHandlePlayerData: (data) => dispatch(handlePlayerData(data)),
});

Login.propTypes = {
  propHandlePlayerData: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
