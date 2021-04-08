import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { fetchToken } from '../actions/fetchToken';
import { userEmail, userName, userAvatar } from '../actions/index';
// import '../App.css';
import '../styles/Login.css';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      validated: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickUser = this.handleClickUser.bind(this);
    this.fetchGravata = this.fetchGravata.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validateInputs();
  }

  validateInputs() {
    const { name, email } = this.state;
    if (name && email) {
      this.setState({
        validated: false,
      });
    }
  }

  async handleClick() {
    const { token, history } = this.props;
    await token();
    history.push('./game');
  }

  handleClickUser(email, name) {
    const { userEmailDispatcher, userNameDispatcher } = this.props;
    userEmailDispatcher(email);
    userNameDispatcher(name);
    this.fetchGravata();
  }

  fetchGravata() {
    const { userAvatarDispatcher } = this.props;
    const { email } = this.props;
    const hashEmail = md5(email).toString();
    const urlAvatar = `https://www.gravatar.com/avatar/${hashEmail}`;
    userAvatarDispatcher(urlAvatar);
  }

  render() {
    const { history } = this.props;
    const { validated, email, name } = this.state;
    return (
      <div className="App-container">
        <img src={ logo } className="App-logo" alt="logo" />
        <form className="form-container">
          <button
            className="configurations-button"
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/configurations') }
          >
            {}
          </button>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="play-button"
            disabled={ validated }
            type="submit"
            data-testid="btn-play"
            onClick={ () => {
              this.handleClick();
              this.handleClickUser(email, name);
            } }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  token: PropTypes.func.isRequired,
  userEmailDispatcher: PropTypes.func,
  userNameDispatcher: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  token: (key) => dispatch(fetchToken(key)),
  userEmailDispatcher: (email) => dispatch(userEmail(email)),
  userNameDispatcher: (name) => dispatch(userName(name)),
  userAvatarDispatcher: (avatar) => dispatch(userAvatar(avatar)),
});
const mapStatetoProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStatetoProps, mapDispatchToProps)(Login);
