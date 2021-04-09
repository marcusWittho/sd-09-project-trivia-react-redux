import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { fetchGameData } from '../actions/index';
import Questions from '../components/Questions';

import './Game.css';

class Game extends Component {
  componentDidMount() {
    const { getGameData, token } = this.props;
    getGameData(token);
  }

  render() {
    return (
      <>
        <Header />
        <Questions />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
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