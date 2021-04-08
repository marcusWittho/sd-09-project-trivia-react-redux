import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { fetchQuestions } from '../redux/actions';
import Header from '../components/Header';
import Question from '../components/Question';

class TriviaPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgUrl: '',
    };

    this.getImgUrl = this.getImgUrl.bind(this);
  }

  componentDidMount() {
    const { getQuestions, token } = this.props;
    const storageToken = localStorage.getItem('token');
    if (storageToken && storageToken.length > 0) {
      getQuestions(JSON.parse(storageToken));
    } else {
      getQuestions(token);
    }
    this.getImgUrl();
  }

  componentDidUpdate() {
    const { token } = this.props;
    const currentToken = localStorage.getItem('token');
    if (currentToken !== token) {
      localStorage.setItem('token', JSON.stringify(token));
    }
  }

  getImgUrl() {
    const { location: { player: { email } } } = this.props;
    const emailHash = md5(email).toString();
    this.setState({
      imgUrl: `https://www.gravatar.com/avatar/${emailHash}`,
    });
  }

  render() {
    const { fetching, location: { player: { name } } } = this.props;
    const { imgUrl } = this.state;
    if (fetching) {
      return (
        <h1>Carregando...</h1>
      );
    }

    return (
      <>
        <Header imgSrc={ imgUrl } name={ name } />
        <h2>Página de jogo</h2>
        <Question />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
  fetching: state.tokenReducer.isFetching,
});

const mapDispatchToProps = {
  getQuestions: fetchQuestions,
};

TriviaPage.propTypes = {
  token: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  getQuestions: PropTypes.func.isRequired,
  location: PropTypes.shape({
    player: PropTypes.shape({
      email: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TriviaPage);
