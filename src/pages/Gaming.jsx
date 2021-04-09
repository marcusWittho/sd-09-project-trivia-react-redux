import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions';
import Header from '../components/Header';

class Gaming extends React.Component {
  constructor(props) {
    super(props);

    this.verifyAll = this.verifyAll.bind(this);
    this.state = {
      redirect: false,
      questionNumber: 0,
      answers: [],
    };
  }

  componentDidMount() {
    this.getArrayOfQuestions();
    this.verifyAll();
  }

  async getArrayOfQuestions() {
    const { questionDispatch } = this.props;
    await questionDispatch();
  }

  getAnswers() {
    const { questionsState: { results } } = this.props;
    const atualState = this.state;
    const newArray = [
      results.correct_answer,
      ...results.incorrect_answers,
    ];
    this.setState({ answers: newArray });
  }

  verifyAll() {
    const { questionsState } = this.props;
    const numberResponse = 3;
    if (questionsState) {
      const { response_code: responseCode } = questionsState;
      if (responseCode === numberResponse) this.setState({ redirect: true });
    }
    if (!localStorage.getItem('token')) {
      this.setState({ redirect: true });
    }
  }


  render() {
    const {
      questionsState: { results },
    } = this.props;
    console.log(results);
    const { redirect, questionNumber } = this.state;
    return redirect ? (
      <Redirect to="/" />
    ) : (
      <>
        <Header />
        <div>
          <p data-testid="question-category">
            {results && results[questionNumber].category}
          </p>
          <p data-testid="question-text">
            {results && results[questionNumber].question}
          </p>
        </div>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  questionDispatch: () => dispatch(fetchQuestions()),
});

const mapStateToProps = (state) => ({
  questionsState: state.questionsReducer.questions,
});

Gaming.propTypes = {
  questionDispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Gaming);
