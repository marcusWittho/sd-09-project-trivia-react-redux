import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setQuestions } from '../Actions/setQuestions';

class GameQuestions extends Component {
  constructor(props) {
    super(props);
    this.teste = this.teste.bind(this);
  }

  componentDidMount() {
    this.teste();
  }

  teste() {
    const { fetchQuestions, token } = this.props;
    console.log(token);
    fetchQuestions(token);
  }

  render() {
    console.log(this.props.token);
    return (
      <div>
        teste
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(setQuestions(token)),
});

const mapStateToProps = (state) => ({
  token: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);
