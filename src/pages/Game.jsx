import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchGameData } from '../actions/index';
import getQuestions from '../services/triviaAPI_questions';
import Answer from '../components/Answer';

import './Game.css';

class Game extends Component {
  /* constructor(props) {
    super(props);

  } */

  componentDidMount() {
    const { getGameData, token } = this.props;
    getGameData(token);
  }

  render() {
    const { questions } = this.props;
    // const answers = ['xablau 1', 'xablau 2'];
    const answerOptions = questions.map((answer) =>
      <Answer key="answer.toString()" description={answer} />
    );
    return (
      <>
        <Header />
        <div className="container-game">
          <section className="question-game">
            {/* campo category */}
            <h2 data-testid="question-category">Politica</h2>
            {/* campo question */}
            <p data-testid="question-text">Texto da pergunta</p>
          </section>
          <section className="answers-game">
            { answerOptions }
          </section>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getGameData: (token) => dispatch(fetchGameData(token)),
});

// export default Game;
export default connect(mapStateToProps, mapDispatchToProps)(Game);


// Pergunta de múltipla escolha
/* {
  "response_code":0,
  "results":[
     {
        "category":"Entertainment: Video Games",
        "type":"multiple",
        "difficulty":"easy",
        "question":"What is the first weapon you acquire in Half-Life?",
        "correct_answer":"A crowbar",
        "incorrect_answers":[
           "A pistol",
           "The H.E.V suit",
           "Your fists"
        ]
     }
  ]
} */