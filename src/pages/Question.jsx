import './css/question.css';
import React from 'react';
import { connect } from 'react-redux';
import { string, objectOf } from 'prop-types';

class Question extends React.Component {
  constructor(props) {
    super(props);

    /* this.state = {
      data: [],
    }; */

    this.createHeader = this.createHeader.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
    // this.inQuestion = this.inQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  fetchAPI() {
    const { dataAnswer } = this.props;
    console.log(dataAnswer);
    // this.setState({ data: dataAnswer });
  }

  createHeader() {
    const { playerState: { name, score, gravatarEmail } } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
          alt="imagem do Gravatar"
          data-testid="header-profile-picture"
        />
        <h4 data-testid="header-player-name">{ name }</h4>
        <h4 data-testid="header-score">{ score }</h4>
        <h2>sss</h2>
      </header>
    );
  }

  inQuestion() {
    const { dataAnswer } = this.props;
    dataAnswer.map((element, index) => {
      console.log(element);
      console.log(index);
      if (element[index].type === 'boolean') {
        return (
          <div key={ index }>
            <p>
              Questão 0
              { 1 }
            </p>
            <p>Boolean</p>
          </div>
        );
      }
      return (
        <div key={ index }>
          <p>
            Questão 0
            { 1 }
          </p>
          <p>Multipla Escolha</p>
        </div>
      );
    });
  }

    /* const { dataAnswer } = this.props;
    // console.log(dataAnswer);
    const { type } = dataAnswer[id];
    // if (dataAnswer === 'Seu login expirou!') return data;
    if (type === 'boolean') {
      return (
        <div>
          <p>
            Questão 0
            { 1 }
          </p>
          <p>Boolean</p>
        </div>
      );
    }
    return (
      <div>
        <p>
          Questão 0
          { 1 }
        </p>
        <p>Multipla Escolha</p>
      </div>
    ); */

  render() {
    // const { data } = this.state;
    // const { dataAnswer } = this.props;
    return (
      <div>
        { this.createHeader() }
        <h1>Game</h1>
        { this.inQuestion() }
      </div>
    );
  }
}

const mapStateToProps = ((state) => ({
  dataAnswer: state.dataGame.data,
  playerState: state.player,
}));

Question.propTypes = {
  dataAnswer: string,
  playerState: objectOf({
    name: string,
    gravatarEmail: string,
  }),
}.isRequired;

export default connect(mapStateToProps, null)(Question);
