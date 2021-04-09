import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { bool, shape } from 'prop-types';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.getRanking = this.getRanking.bind(this);

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => ((b.score !== a.score) && b.score - a.score));
    this.setState({ ranking });
  }

  render() {
    const { ranking } = this.state;
    const { player } = this.props;
    const { validLogin } = player;
    if (!validLogin) return <Redirect to="/" />;
    return (
      <section>
        <div>
          <h1 data-testid="ranking-title">Hanking</h1>
          <Link exact to="/">
            <button type="button" data-testid="btn-go-home">
              Inicio
            </button>
          </Link>
          <ul>
            { ranking.map((value, index) => (
              <li key={ index }>
                {console.log(value)}
                <img src={ value.picture } alt={ `Avata de ${value.name}` } />
                <div>
                  <p>
                    <strong>Nome:</strong>
                    &nbsp;
                    <span data-testid={ `player-name-${index}` }>{ value.name }</span>
                  </p>
                  <p>
                    <strong>Pontuação:</strong>
                    &nbsp;
                    <span data-testid={ `player-score-${index}` }>{ value.score }</span>
                  </p>
                </div>
              </li>
            )) }
          </ul>
        </div>
      </section>
    );
  }
}

Ranking.propTypes = {
  player: shape({
    validLogin: bool,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.playerReducer.player,
});

export default connect(mapStateToProps)(Ranking);
