import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import addUserInfo from '../actions';
import ButtonSettings from '../components/ButtonSettings';
import fetchTrivia from '../actions/trivia';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.getValue = this.getValue.bind(this);
    this.proceedToGame = this.proceedToGame.bind(this);
  }

  getValue({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  proceedToGame() {
    const { addUserInfo: addUser, getTriviaQuestions } = this.props;
    addUser(this.state);
    getTriviaQuestions();
  }

  render() {
    const { name, email } = this.state;
    const disableButton = name === '' || email === '';

    return (
      <section>
        <input
          name="name"
          data-testid="input-player-name"
          type="text"
          onChange={ this.getValue }
        />
        <input
          name="email"
          data-testid="input-gravatar-email"
          type="email"
          onChange={ this.getValue }
        />
        <Link to="/game">
          <button
            onClick={ this.proceedToGame }
            data-testid="btn-play"
            type="button"
            disabled={ disableButton }
          >
            Jogar
          </button>
        </Link>
        <ButtonSettings />
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUserInfo: (state) => dispatch(addUserInfo(state)),
  getTriviaQuestions: () => dispatch(fetchTrivia()),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  addUserInfo: PropTypes.func.isRequired,
  getTriviaQuestions: PropTypes.func.isRequired,
};
