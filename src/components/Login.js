import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../actions/loginAction';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

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
        <button
          type="button"
          data-testid="btn-play"
          disabled={ buttonBool }
        >
          Jogar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(loginAction(name, value)),
});

Login.propTypes = {
  setValue: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
