import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken } from '../actions/fetchToken';
import '../App.css';
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

  render() {
    const { validated } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <form>
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                data-testid="input-player-name"
                name="name"
                onChange={ this.handleChange }
              />
            </label>
            <br />
            <label htmlFor="email">
              Email:
              <input
                type="email"
                data-testid="input-gravatar-email"
                name="email"
                onChange={ this.handleChange }
              />
            </label>
            <br />
            <button
              disabled={ validated }
              type="button"
              data-testid="btn-play"
              onClick={ this.handleClick }
            >
              Jogar
            </button>
          </form>
          <p>
            SUA VEZ
          </p>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  token: (key) => dispatch(fetchToken(key)),
});

Login.propTypes = {
  token: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
