import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setToken } from '../Actions/setLogin';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  validateLogin() {
    const { name, email } = this.state;
    const validateName = name.length > 1;
    const validateEmail = email.length > 1;
    return validateName && validateEmail;
  }

  handleClick() {
    const { setLogin } = this.props;
    setLogin();
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <h2>
          Trivia
        </h2>
        <input
          type="text"
          name="name"
          value={ name }
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <input
          name="email"
          type="text"
          value={ email }
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <Link to="/trivia">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !this.validateLogin() }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLogin: () => dispatch(setToken()),
});

export default connect(null, mapDispatchToProps)(Login);
