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

    render() {
        const { questions, indice, isLoading } = this.state;
        const crrQuestion = questions[indice];
        return(
          isLoading ? <p>Loading...</p> : 
          <div>
          <Header />
          <h1 data-testid="question-category">
            {crrQuestion.category}
          </h1>
          <h2 data-testid="question-text">{crrQuestion.question}</h2>
          <button onClick={() => this.setState((prevState) => ({indice: prevState.indice + 1}))}>
            <p data-testid="correct-answer">{crrQuestion.correct_answer}</p>
          </button>
          {crrQuestion.incorrect_answers.map((incorrectAnswer, index) => (
            <button
              key={ Math.random() }
              onClick={() => this.setState((prevState) => ({indice: prevState.indice + 1}))}
            >
              <p data-testid={ `wrong-answer-${index}` } key={ Math.random() }>
                {incorrectAnswer}
              </p>
            </button>
          ))}
        </div>
        )
  }
}

export default InfoGames;
