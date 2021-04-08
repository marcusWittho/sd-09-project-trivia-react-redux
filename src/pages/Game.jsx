import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../services/fetchApis';

class Game extends Component {
  constructor(props) {
    super(props);

    this.fetchQuest = this.fetchQuest.bind(this);
    this.returnGame = this.returnGame.bind(this);

    this.state = {
      loading: true,
      questions: [],
      i: 0,
    };
  }

  componentDidMount() {
    this.fetchQuest();
  }

  async fetchQuest() {
    const { token } = this.props;
    const response = await fetchQuestions(token);
    this.setState({
      questions: response,
      loading: false,
    });
  }

  returnGame() {
    const { image } = this.props;
    const negative = -1;
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { questions, i } = this.state;
    const currentQuestion = questions[i];
    const allQuestions = [
      currentQuestion.correct_answer,
      ...currentQuestion.incorrect_answers,
    ];
    const answers = allQuestions.map((answer, index) => {
      const testId = index === 0 ? 'correct-answer' : `wrong-answer-${index - 1}`;
      return (
        <button key={ answer } type="button" data-testid={ testId }>{answer}</button>
      );
    });
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ image } alt="player avatar" />
          <span data-testid="header-player-name">{player.name}</span>
          <span data-testid="header-score">{player.score}</span>
        </header>
        <span>
          <Link to="/feedback">feedback</Link>
        </span>
        <div>
          <h2 data-testid="question-category">{questions[i].category}</h2>
          <h3 data-testid="question-text">{questions[i].question}</h3>
          <span>
            {answers.sort((buttonA, buttonB) => {
              if (buttonA.key > buttonB.key) return 1;
              if (buttonA.key < buttonB.key) return negative;
              return 0;
            })}
          </span>
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      loading === true ? <span>loading...</span> : this.returnGame()
    );
  }
}

const mapStateToProps = ({ loginReducer }) => ({
  image: loginReducer.picture,
  questions: loginReducer.questions,
  token: loginReducer.token,
});

Game.propTypes = {
  image: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
