import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { loginAction } from '../actions/loginAction';
import { getThunkToken } from '../actions/apiTriviaAction';
import { playerAction } from '../actions/gameAction';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.clickButton = this.clickButton.bind(this);

    this.state = {
      name: '',
      email: '',
      buttonBool: true,
    };
  }

  handleChange({ target }) {
    const { setValue } = this.props;
    const emailRE = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
    const { name, value } = target;

    this.setState((prevState) => {
      if (prevState.name.length !== 0
        && emailRE.test(prevState.email)) {
        this.setState({
          buttonBool: false,
        });
      } else {
        this.setState({
          buttonBool: true,
        });
      }
    }, this.setState({
      [name]: value,
    }),
    setValue(name, value));
  }

  clickButton() {
    const { setQuestions, setPlayerAction } = this.props;
    setQuestions();

    const { name, email } = this.state;
    const gravatarEmail = md5(email).toString();

    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail,
    };

    setPlayerAction(player);
  }

  render() {
    const { buttonBool, email, name } = this.state;

    return (
      <div>
        <div>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              name="name"
              id="name"
              value={ name }
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
        </div>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.clickButton }
            disabled={ buttonBool }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(loginAction(name, value)),
  setQuestions: () => dispatch(getThunkToken()),
  setPlayerAction: (player) => dispatch(playerAction(player)),
});

Login.propTypes = {
  setValue: PropTypes.func,
  setQuestions: PropTypes.func,
  setPlayerAction: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);

