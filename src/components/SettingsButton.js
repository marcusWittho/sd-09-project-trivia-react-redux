import React from 'react';
import { Redirect } from 'react-router-dom';

class button extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.state = { shouldRedirect: false };
  }

  redirect() {
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/settings" />;
    return (
      <button
        data-testid="btn-settings"
        type="button"
        onClick={ this.redirect }
      >
        Settings
      </button>
    );
  }
}

export default button;
