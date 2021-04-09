import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import addUserInfo from '../actions';
import ButtonSettings from '../components/ButtonSettings';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.getValue = this.getValue.bind(this);
  }

  getValue({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;
    const { addUserInfo: addUser } = this.props;
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
            onClick={ () => addUser(this.state) }
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
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  addUserInfo: PropTypes.func.isRequired,
};
