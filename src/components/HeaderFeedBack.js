import React from 'react';
import { string, number } from 'prop-types';
import { connect } from 'react-redux';

class HeaderFeedBack extends React.Component {
  render() {
    const { hash, name, score } = this.props; /* essas props virão do pai desse componente ou do estado global */
    return (
      <header data-testid="feedback-text">
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="gravatar" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="feedback-total-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  hash: state.loginReducer.hash,
  name: state.loginReducer.name,
  score: state.mainReducer.score,
});

HeaderFeedBack.propTypes = {
  image: string,
  name: string,
  score: number,
}.isRequired;

export default connect(mapStateToProps)(HeaderFeedBack);
