import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.renderResultsInfo = this.renderResultsInfo.bind(this);
  }

  renderResultsInfo() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = state;
    const minAssertions = 3;
    return (
      <section>
        <h2 data-testid="feedback-text">
          {assertions < minAssertions ? 'Podia ser melhor...' : 'Mandou bem!'}
        </h2>
        <div>
          Pontuação total:
          <p data-testid="feedback-total-score">
            {score}
          </p>
        </div>
        <div>
          Número de acertos:
          <p data-testid="feedback-total-question">
            {assertions}
          </p>
        </div>
      </section>
    );
  }

  render() {
    return (
      <main>
        <Header />
        {this.renderResultsInfo()}
      </main>
    );
  }
}

export default Feedback;
