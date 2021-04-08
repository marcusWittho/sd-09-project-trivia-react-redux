import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import questionsAdd from '../redux/actions';
import Header from '../Components/Header';
import TriviaCardsBA from '../Components/TriviaCardsBA';
import TriviaCardsMA from '../Components/TriviaCardsMA';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update() {
    const { questions } = this.props;
    if (questions) {
      return questions.map((question) => (
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

const mapStateToProps = ({ game }) => ({
  questions: game.questions,
});

export default connect(mapStateToProps)(Trivia);
