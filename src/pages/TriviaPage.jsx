import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TriviaPage extends React.Component {
  componentDidUpdate() {
    const { token } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
  }

  render() {
    const { fetching } = this.props;
    if (fetching) {
      return (
        <h1>Carregando...</h1>
      );
    }

    return (
      <div>Página de jogo</div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
  fetching: state.tokenReducer.isFetching,
});

TriviaPage.propTypes = {
  token: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(TriviaPage);
