import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import questionsAdd from '../redux/actions';
import Header from '../Components/Header';
import TriviaCardsBA from '../Components/TriviaCardsBA';
import TriviaCardsMA from '../Components/TriviaCardsMA';
import './answers.css';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update() {
    const { questions } = this.props;
    if (questions) {
      const { questIndex } = this.props;
      const i = parseInt(questIndex, 10);
      const quest = questions[i];
      return (Array(quest)).map((question) => (
        (question.type === 'multiple')
          ? <TriviaCardsMA question={ question } />
          : <TriviaCardsBA question={ question } />
      ));
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          { this.update() }
        </div>
      </div>
    );
  }
}

Trivia.propTypes = {
  questions: PropTypes.arrayOf(Object).isRequired,
  questIndex: PropTypes.number.isRequired,
};

const mapStateToProps = ({ game }) => ({
  questions: game.questions,
  questIndex: game.index,
});

export default connect(mapStateToProps)(Trivia);
