import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAction, userInfoAction, updateImg } from '../actions/action';

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
    const { sendToken, sendUserInfo } = this.props;
    const { userName, userEmail } = this.state;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const dataToken = await response.json();
    localStorage.setItem('token', JSON.stringify(dataToken.token));
    sendToken(dataToken.token);
    sendUserInfo(userName, userEmail);
    this.fetchGravatar(dataToken.token);
  }

  async fetchGravatar(token) {
    const { sendImg } = this.props;
    const fetchApi = await fetch(`https://www.gravatar.com/avatar/${token}`);
    sendImg(fetchApi.url);
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
          <Link to="/settings">
            <button
              data-testid="btn-settings"
              type="button"
            >
              Configurações
            </button>
          </Link>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendToken: (e) => dispatch(loginAction(e)),
  sendUserInfo: (name, email) => dispatch(userInfoAction(name, email)),
  sendImg: (value) => dispatch(updateImg(value)),
});

Login.propTypes = {
  sendToken: PropTypes.func.isRequired,
  sendUserInfo: PropTypes.func.isRequired,
  sendImg: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
