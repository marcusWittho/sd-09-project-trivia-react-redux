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
    this.buttonSetting = this.buttonSetting.bind(this);

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
    const { name, email } = this.state;
    const gravatarEmail = md5(email).toString();
    const {
      setQuestions,
      setPlayerAction,
      getDifficulty,
      getCategory,
      getType } = this.props;

    setQuestions(getDifficulty, getCategory, getType);

    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail,
    };

    setPlayerAction(player);
  }

  buttonSetting() {
    return (
      <Link to="/settings">
        <button
          type="button"
          data-testid="btn-settings"
        >
          Configurações
        </button>
      </Link>
    );
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
        { this.buttonSetting() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getDifficulty: state.settingsReducer.difficulty,
  getCategory: state.settingsReducer.category,
  getType: state.settingsReducer.type,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(loginAction(name, value)),
  setQuestions: (diffic, categ, type) => (
    dispatch(getThunkToken(diffic, categ, type))),
  setPlayerAction: (player) => dispatch(playerAction(player)),
});

Login.propTypes = {
  setValue: PropTypes.func,
  setQuestions: PropTypes.func,
  setPlayerAction: PropTypes.func,
  getCategories: PropTypes.func,
  getDifficulty: PropTypes.string,
  getCategory: PropTypes.string,
  getType: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
