import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';
import { setToken, setInit, setNameAndEmail } from '../redux/actions';

class loginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      login: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleValidateEmail = this.handleValidateEmail.bind(this);
  }

  componentDidMount() {
    const { propSetInit } = this.props;
    propSetInit();
  }

  setupButton() {
    return (
      <button
        data-testid="btn-settings"
        type="button"
      >
        <Link to="/settings"> Settings </Link>
      </button>
    );
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { propSetToken, propSetNameAndEmail } = this.props;
    const { name, email } = this.state;
    const gravatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    await propSetToken();
    await propSetNameAndEmail(name, email, gravatar);
    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatar,
      },
    }));
    this.setState({
      login: true,
    });
  }

  handleValidateEmail() {
    const { email } = this.state;
    return (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email));
  }

  render() {
    const { name, email, login } = this.state;
    if (login) return <Redirect to="/trivia" />;
    return (
      <div className="App">
        <div>
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
          </header>
        </div>
        <p>Login</p>
        <div>
          <input
            data-testid="input-player-name"
            name="name"
            type="text"
            value={ name }
            placeholder="Nome:"
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-gravatar-email"
            name="email"
            type="email"
            value={ email }
            placeholder="Email:"
            onChange={ this.handleChange }
          />
        </div>
        <br />
        <button
          data-testid="btn-play"
          type="button"
          onClick={ this.handleClick }
          disabled={ !(this.handleValidateEmail() && name) }
        >
          Jogar
        </button>
        { this.setupButton() }
      </div>
    );
  }
}

loginScreen.propTypes = {
  propSetToken: PropTypes.func,
  propSetNameAndImail: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  propSetToken: () => dispatch(setToken()),
  propSetNameAndEmail:
    (name, email, gravatar) => dispatch(setNameAndEmail(name, email, gravatar)),
  propSetInit: () => dispatch(setInit()),
});

export default connect(null, mapDispatchToProps)(loginScreen);
