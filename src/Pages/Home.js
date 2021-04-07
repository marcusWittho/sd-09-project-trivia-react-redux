import React from 'react';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';
import Header from '../Components/Header';
import SelectSettings from '../Components/SelectSettings';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    // criar restante da função e logicas de fetch
    // return history.push('/trivia');  --- return inicial feito pelo Rodrigo
    return window.location('/trivia');
  }

  render() {
    const { email, name, score } = this.props;
    return (
      <div>
        <Header email={ email } name={ name } score={ score } />
        <button
          className="btn"
          type="button"
          onClick={ this.clickHandler }
        >
          Start!
        </button>
        <SelectSettings />
      </div>
    );
  }
}

Home.propTypes = {
  email: string,
  name: string,
  score: number,
}.isRequired;

const mapStatetoProps = (state) => ({
  // verificar contrução das actions e reducer antes de usar
  email: state.user.email,
  name: state.user.name,
  score: state.user.score,
});

export default connect(mapStatetoProps)(Home);
