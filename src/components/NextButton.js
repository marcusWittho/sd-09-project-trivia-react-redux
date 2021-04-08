import React from 'react';
import { Redirect } from 'react-router-dom';

class buttonNext extends React.Component {
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
    if (redirect) return <Redirect to="/question" />;
    return (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ this.redirect }
      >
        Próxima
      </button>
    );
  }
}

export default buttonNext;
