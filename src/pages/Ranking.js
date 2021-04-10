import React from 'react';
import { Redirect } from 'react-router-dom';
import './Ranking.css';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { shouldRedirect: false };
  }

  handleClick() {
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/" />;
    return (
      <div>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.handleClick }
        >
          Go Home
        </button>
      </div>
    );
  }
}

export default Ranking;
