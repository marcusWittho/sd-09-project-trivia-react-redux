import React, { Component } from 'react';
import Header from '../components/Header';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import getQuestions from '../services/triviaAPI_questions';

import './Game.css';

class Game extends Component {
  render() {
    // getQuestions();
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

          </section>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({

})

export default Game;
// export default connect(mapStateToProps)(Game);


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