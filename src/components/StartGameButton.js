import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';
import { getToken } from '../services/api';

class StartGameButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { shouldRedirect: false };
  }

  async handleClick() {
    const { name, email, setToken } = this.props;
    const token = await getToken();
    localStorage.token = `${token}`;
    setToken(name, email, `${token}`);
  }

  render() {
    const { buttonStatus } = this.props;
    const { shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/QuestionPage" />;
    return (
      <button
        type="button"
        data-testid="btn-play"
        onClick={ this.handleClick }
        disabled={ buttonStatus }
      >
        Jogar
      </button>
    );
  }
}

StartGameButton.propTypes = {
  setToken: PropTypes.string,
  buttonStatus: PropTypes.bool,
}.isRequired;

const mapStateToProps = ({ user }) => ({
  name: user.name,
  email: user.email,
});

const mapDispatchToProps = (dispatch) => ({
  setToken: (name, email, token) => dispatch(login(name, email, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartGameButton);
