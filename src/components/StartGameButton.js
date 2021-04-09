import React from 'react';
import { Redirect } from 'react-router';
import { string, bool } from 'prop-types';
import { getToken } from '../services/api';

class StartGameButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { shouldRedirect: false };
  }

  async handleClick() {
    const token = await getToken();
    localStorage.token = `${token}`;
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
        Start Game
      </button>
    );
  }
}

StartGameButton.propTypes = { setToken: string, buttonStatus: bool }.isRequired;

export default StartGameButton;
