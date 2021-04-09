import React, { Component } from 'react';
import Header from '../components/Header'
import * as api from '../services/fetchApi';


class InfoGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      indice: 0,
      isLoading: true
    }
    this.requestAPI = this.requestAPI.bind(this);
  }
  
  componentDidMount() {
    this.requestAPI();
  }  
 
  async requestAPI() {
    const token = JSON.parse(localStorage.getItem('token'));
    const responsRequest = await api.fetchTrivia(token, 5);
    this.setState({
      questions: responsRequest.results,
      isLoading: false,
    });
  }

  renderQuestions() {
    const { questions, indice } = this.state;
    const crrQuestion = questions[indice];
    const alternativesOld = crrQuestion.incorrect_answers
      .concat(crrQuestion.correct_answer);
    const numberMagic = 0.5;
    const alternatives = alternativesOld.sort(() => Math.random() - numberMagic);
    return (
      <div>
        <Header />
        <h1 data-testid="question-category">
          {crrQuestion.category}
        </h1>
        <h2 data-testid="question-text">{crrQuestion.question}</h2>
        {alternatives.map((alternative, index) => (
          <button
            key={ Math.random() }
            type="button"
            onClick={
              () => this.setState((prevState) => ({ indice: prevState.indice + 1 }))
            }
            data-testid={ alternative === crrQuestion.correct_answer ? 'correct-answer'
              : `wrong-answer-${index}` }
          >
            {alternative}
          </button>))}
        </div>
        )
  }
}

export default InfoGames;
