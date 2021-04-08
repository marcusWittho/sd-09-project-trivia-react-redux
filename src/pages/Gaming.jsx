import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions';
import Header from '../components/Header';

class Gaming extends React.Component {
  componentDidMount() {
    this.getArrayOfQuestions();
  }

  async getArrayOfQuestions() {
    const { questionDispatch } = this.props;
    await questionDispatch();
  }

  render() {
    const { questionsState } = this.props;
     console.log(questionsState);
    return (
      <>
        <Header />
        <div>
          <p data-testid="question-category"> { } </p>
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
