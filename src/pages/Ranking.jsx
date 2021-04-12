import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router';

// class Ranking extends Component {
//   constructor() {
//     super();

//     this.state = {
//       loginScreen: false,
//     };

//     this.playAgain = this.playAgain.bind(this);
//   }

//   playAgain() {
//     this.setState({
//       loginScreen: true,
//     });
//   }

//   render() {
//     const { loginScreen } = this.state;

//     if (loginScreen) return <Redirect to="/" />;

//     const recoverRanking = JSON.parse(localStorage.getItem('ranking'));
//     recoverRanking.sort((a, b) => {
//       const menosUm = -1;
//       if (a.score > b.score) return menosUm;
//       if (a.score < b.score) return 1;
//       return 0;
//     });

//     return (
//       recoverRanking.map((player, index) => (
//         <div data-testid="ranking-title" key={ index }>
//           <img
//             src={ `https://www.gravatar.com/avatar/${md5(player.picture).toString()}` }
//             alt="Avatar do jogador"
//           />
//           <p data-testid={ `player-name-${index}` }>{ player.name }</p>
//           <p data-testid={ `player-score-${index}` }>{ player.score }</p>

//           <button
//             data-testid="btn-go-home"
//             type="button"
//             onClick={ this.playAgain }
//           >
//             Login Page
//           </button>
//         </div>
//       ))
//     );
//   }
// }

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      loginScreen: false,
    };
    this.playAgain = this.playAgain.bind(this);
    this.handleRanking = this.handleRanking.bind(this);
  }

  playAgain() {
    this.setState({
      loginScreen: true,
    });
  }

  handleRanking() {
    const recoverRanking = JSON.parse(localStorage.getItem('ranking'));
    recoverRanking.sort((a, b) => b.score - a.score);
    return (
      recoverRanking.map((player, index) => (
        <div data-testid="ranking-title" key={ index }>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(player.picture).toString()}` }
            alt="Avatar do jogador"
          />
          {console.log(recoverRanking)}
          <p data-testid={ `player-name-${index}` }>{ player.name }</p>
          <p data-testid={ `player-score-${index}` }>{ player.score }</p>
        </div>
      ))
    );
  }

  render() {
    const { loginScreen } = this.state;
    if (loginScreen) return (<Redirect to="/" />);
    return (
      <>
        { this.handleRanking() }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.playAgain }
        >
          Login Page
        </button>
      </>
    );
  }
}

export default Ranking;
