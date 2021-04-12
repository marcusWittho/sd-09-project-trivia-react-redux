import React, { Component } from 'react';

export default class Question extends Component {
  render() {
    const { data: { category, question }, index } = this.props;

    return (
      <section className="question-game">
        <h2 data-testid="question-category">{ category }</h2>
        <p data-testid="question-text">{ question }</p>
      </section>
    );
  }
}
