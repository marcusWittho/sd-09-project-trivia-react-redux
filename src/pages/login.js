import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import { getToken, setNameAndEmail } from '../redux/actions';

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
    const { propGetToken, propSetNameAndEmail } = this.props;
    const { name, email } = this.state;
    await propGetToken();
    await propSetNameAndEmail(name, email);
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
  propGetToken: PropTypes.func,
  propSetNameAndImail: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ actionsReducer }) => ({
  actionsReducer,
});

const mapDispatchToProps = (dispatch) => ({
  propGetToken: () => dispatch(getToken()),
  propSetNameAndEmail: (name, email) => dispatch(setNameAndEmail(name, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(loginScreen);
