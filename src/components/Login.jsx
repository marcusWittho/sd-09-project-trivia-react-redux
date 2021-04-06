import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setLoginAction from '../redux/Actions/setLoginAction';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.isNotValidated = this.isNotValidated.bind(this);

    this.state = {
      userEmail: '',
      userName: '',
      isNotValidated: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.isNotValidated());
  }

  isNotValidated() {
    const { userEmail, userName } = this.state;
    const emailValidated = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(userEmail);
    const userNameValidated = /[0-9a-zA-Z$*&@#]{4}/.test(userName);

    if (emailValidated && userNameValidated) {
      this.setState({
        isNotValidated: false,
      });
    } else {
      this.setState({
        isNotValidated: true,
      });
    }
  }

  render() {
    const { isNotValidated, userName, userEmail } = this.state;
    const { addLogin } = this.props;
    return (
      <>
        <label htmlFor="user-name">
          Nome:
          <input
            onChange={ this.handleChange }
            data-testid="input-player-name"
            name="userName"
            value={ userName }
            id="user-name"
            type="text"
          />
        </label>

        <label htmlFor="user-email">
          Email:
          <input
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
            name="userEmail"
            value={ userEmail }
            id="user-email"
            type="email"
          />
        </label>

        <button
          disabled={ isNotValidated }
          data-testid="btn-play"
          type="button"
          onClick={ () => addLogin(userName, userEmail) }
        >
          Play
        </button>
      </>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addLogin: (userName, userEmail) => dispatch(setLoginAction(userName, userEmail)),
});

Login.propTypes = {
  addLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
