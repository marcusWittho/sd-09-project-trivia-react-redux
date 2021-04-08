import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestionsToStore } from '../actions';
import { getQuestions } from '../services/api';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNum: 0,
      loading: true,
    };

    this.renderQuestion = this.renderQuestion.bind(this);
  }

  componentDidMount() {
    this.getAndSaveQuestions();
  }

  async getAndSaveQuestions() {
    const { saveQuestions } = this.props;
    const userToken = localStorage.getItem('token');
    const API_RESULT = await getQuestions(userToken);
    saveQuestions(API_RESULT);
    this.setState({ loading: false });
  }

  renderQuestion(num) {
    const { questions } = this.props;
    const { questionNum } = this.state;
    return (
      <>
        <p data-testid="question-category">{ questions[questionNum].category }</p>
        <p data-testid="question-text">{ questions[questionNum].question }</p>
        <p data-testid="correct-answer">{ questions[questionNum].correct_answer }</p>
        {questions[questionNum].incorrect_answers
          .map((item, index) => (
            <p key={index} data-testid={`wrong-answer-${index}`}>{item}</p>))}
      </>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        { loading ? (<div>Loading</div>) : this.renderQuestion() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.getQuestions.questions,
});

const mapDispatchToProps = (dispatch) => ({
  saveQuestions: (questions) => dispatch(getQuestionsToStore(questions)),
});

Questions.propTypes = {
  saveQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
