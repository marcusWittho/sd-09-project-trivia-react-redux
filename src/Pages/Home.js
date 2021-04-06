import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import Header from './components/Header';
import SelectSettings from './components/SelectSettings';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    // criar restante da função e logicas de fetch
   return history.push('/trivia');
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
}.isRequired;

const mapStatetoProps = (state) => ({
  //verificar contrução das actions e reducer antes de usar
  email: state.user.email,
  name: state.user.email,
});

export default connect(mapStatetoProps)(Home);