import React from 'react';
import { Redirect } from 'react-router-dom';

class button extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.state = {
      redirect: false,
    };
  }

  redirect() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/settings" />;
    return (
      <button
        data-testid="btn-settings"
        type="button"
        onClick={ this.redirect }
      >
        Configurações
      </button>
    );
  }
}

export default button;
