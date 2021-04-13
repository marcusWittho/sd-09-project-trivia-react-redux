import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { REQUEST_GRAVATAR_IMG } from '../services';

class Rankings extends Component {
  constructor(props) {
    super(props);
    this.renderRankingList = this.renderRankingList.bind(this);
  }

  renderRankingList() {
    function compare(a, b) {
      const menos = -1;
      if (a.player.score > b.player.score) { return menos; }
      if (a.player.score < b.player.score) { return 1; }
      return 0;
    }
    const rankingList = JSON.parse(localStorage.getItem('ranking'));
    return (
      <ol>
        { rankingList.sort(compare).map((user, index) => (
          <li key={ index }>
            <img
              src={ REQUEST_GRAVATAR_IMG(user.player.gravatarEmail) }
              alt={ user.player.name }
            />
            <span data-testid={ `player-name-${index}` }>{ user.player.name }</span>
            <span data-testid={ `player-score-${index}` }>{ user.player.score }</span>
          </li>
        )) }
      </ol>
    );
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Rankings</h1>
        {this.renderRankingList()}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Tela Inicial</button>
        </Link>
      </div>
    );
  }
}
export default Rankings;
