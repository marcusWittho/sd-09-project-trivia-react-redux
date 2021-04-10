import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Ranking.css';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      shouldRedirect: false,
      ranking: []
    }
  }

  handleClick() {
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { shouldRedirect,  } = this.state;
    const ranking = JSON.parse(localStorage.getItem('ranking'))
    if (shouldRedirect) return <Redirect to="/" />;
    return (
      <div>
        <ol>
          {ranking.map((tag, index) => (
              <li>
                <img src={ `https://www.gravatar.com/avatar/${tag.token}` } alt="user-image"/>
                <h2 data-testid={`player-name-${index}`} >{ tag.name }</h2>
                <h3 data-testid={`player-score-${index}`}>{ tag.score }</h3>
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
