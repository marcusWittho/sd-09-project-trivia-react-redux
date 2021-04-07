import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../common/components/Header';
import QuestionCard from '../common/components/QuestionCard';
import { questions as questionsAction } from '../actions/action';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      APIquestions: [],
      currentQuestion: 0,
    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const { token, questions } = this.props;
    const questionsResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((result) => Promise.resolve(result));
    questions(questionsResponse.results);
    this.setState({
      APIquestions: questionsResponse.results,
    });
  }

  render() {
    const { APIquestions, currentQuestion } = this.state;
    return (
      <section>
        <Header />
        { APIquestions.length !== 0
          ? <QuestionCard renderQuestion={ APIquestions[currentQuestion] } />
          : <h1>Deu ruim</h1> }
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  questions: (e) => dispatch(questionsAction(e)),
});

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  questions: state.addQuestions.question,
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
