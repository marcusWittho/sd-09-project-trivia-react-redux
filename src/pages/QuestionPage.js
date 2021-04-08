import React from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../services/api';
import { setQuestions } from '../actions';
import { Header, QuestionMultiple, QuestionBool } from '../components';
import './QuestionPage.css';

class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.state = { index: 0 };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const { updateQuestions } = this.props;
    const data = await getQuestions();
    updateQuestions(data);
  }

  createQuestion() {
    const { questions } = this.props;
    const { index } = this.state;
    if (questions.length > 0) {
      switch (questions[index].type) {
      case 'multiple':
        return <QuestionMultiple question={ questions[index] } />
      case 'boolean':
        return <QuestionBool question={ questions[index] } />
      default:
        break;
      }
    }
  }

  render() {
    return (
      <div>
        <Header />
        { this.createQuestion() }
      </div>
    );
  }
}

const mapStateToProps = ({ trivia }) => ({
  questions: trivia.questions,
});

const mapDispatchToProps = (dispatch) => ({
  updateQuestions: (questions) => dispatch(setQuestions(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
