import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actionLogin from '../actions/action';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.reqApi = this.reqApi.bind(this);

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

  async reqApi() {
    const { sendToken } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const dataToken = await response.json();
    sendToken(dataToken.token);
    localStorage.setItem('token', JSON.stringify(dataToken.token));
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
          <Link to="/game">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !(userName && userEmail) }
              onClick={ () => this.reqApi() }
            >
              Jogar
            </button>
          </Link>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendToken: (e) => dispatch(actionLogin(e)),
});

Login.propTypes = {
  sendToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
