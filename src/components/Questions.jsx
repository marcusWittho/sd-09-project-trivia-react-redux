import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf } from 'prop-types';
import Logotipo from './Logotipo';
import Question from './Question';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = { timer: 30 };
  }

  tick() {
    this.setState(state => ({
      timer: state.timer - 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { questions } = this.props;
    const { timer } = this.state;

    return (
      <div>
        {
          !questions.length
            ? <Logotipo />
            : (
              <main className="container-game">
                {
                  /*
                    Fiz assim pra poder aparecer só uma questão
                    A pessoa que foi fazer o botão de próxima deve implementar
                    a lógica de passar entre as questões igual na pokedex
                    Assim podemos focar no que os requisitos estão de fato pedindo ^^
                    Ass: Raquel
                  */
                  [questions[0]].map((question, index) => (
                    <Question data={ question } key={ index } />
                  ))
                }
                {timer > 0 ? <p>{ timer }</p> : <p>0</p>}
              </main>
            )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
});

Questions.propTypes = {
  questions: arrayOf(),
}.isRequired;

export default connect(mapStateToProps)(Questions);
