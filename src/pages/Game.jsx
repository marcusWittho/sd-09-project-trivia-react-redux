import './css/game.css';
import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
// import { , getToken } from '../services/triviaApi';
// import {  } from '../redux/actions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   questions: [],
    // };
    // this.fetchAnswer = this.fetchAnswer.bind(this);
    this.inQuestion = this.inQuestion.bind(this);
  }

  /* componentDidMount() {
    this.fetchAnswer();
  } */

  // async fetchAnswer() {
  /* const answer = await getAnswer('5', getToken);
  if (answer.response_code === 3) return console.log('API Mock');
  const { propDataGame } = this.props;
  propDataGame(answer.results); */
  // console.log(answer.response_code);
  // console.log(answer.results);
  // console.log(answer.results[3]);
  // console.log(answer.results[3].type);
  // }

  inQuestion(data) {
    console.log(data);
    const { type } = data[0];
    if (type === 'boolean') {
      return (
        <div>
          <p>
            Questão 0
            { 1 }
          </p>
          <p>Boolean</p>
        </div>
      );
    }
    return (
      <div>
        <p>
          Questão 0
          { 1 }
        </p>
        <p>Multipla Escolha</p>
      </div>
    );
  }

  render() {
    // const { inQuestion } = this;
    const { dataAnswer } = this.props;
    console.log(dataAnswer);
    // const { questions } = this.state;
    // console.log(getAPI);
    return (
      <div>
        <h1>Game</h1>
        {/* <div>
          { dataAnswer.map((element, index) => inQuestion(element, index)) }
        </div> */}
        { this.inQuestion(dataAnswer) }
        {/* { inQuestion(getAPI(), '2') }
        { inQuestion(getAPI(), '3') }
        { inQuestion(getAPI(), '4') }
        { inQuestion(getAPI(), '5') } */}
      </div>
    );
  }
}

const mapStateToProps = ((state) => ({
  dataAnswer: state.dataGame.data,
}));

Game.propTypes = {
  dataAnswer: string.isRequired,
};

export default connect(mapStateToProps, null)(Game);
