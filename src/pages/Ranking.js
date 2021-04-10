import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Ranking.css';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { shouldRedirect: false,  ranking: [] }
  }

  handleClick() {
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { shouldRedirect,  } = this.state;
    const ranking = JSON.parse(localStorage.ranking);
    if (shouldRedirect) return <Redirect to="/" />;
    return (
      <div>
        <ol>
          {ranking.map((player, index) => (
            <li key={ index }>
              <img src={ `https://www.gravatar.com/avatar/${player.token}` } alt={ player.name } />
              <h2 data-testid={ `player-name-${index}` }>{ player.name }</h2>
              <h3 data-testid={ `player-score-${index}` }>{ player.score }</h3>
            </li>
          ))}
        </ol>
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

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(Ranking);
