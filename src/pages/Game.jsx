import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { questions as questionsAction } from '../actions/action';

class Game extends React.Component {
  componentDidMount() {
    this.fetchQuestions();
  }

 async fetchQuestions() {
    const { token, questions } = this.props;
    const req = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((result) => Promise.resolve(result));
      console.log(req.results[1]);
    questions(req.results);
  }

  render() {
    return (
      <section>
        <h1>Trivia</h1>
        <h3 data-testid="question-category">Categorias</h3>
        <p data-testid="question-text">Texto</p>
        <span></span>
        <Header />
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  questions: (e) => dispatch(questionsAction(e)),
});

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
