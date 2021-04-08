import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addUserInfo from '../actions';

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
        <input
          onClick={ () => addUser(this.state) }
          data-testid="btn-play"
          type="button"
          disabled={ disableButton }
          value="Jogar"
        />
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
