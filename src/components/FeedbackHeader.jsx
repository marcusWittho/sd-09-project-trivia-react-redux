import React from 'react';
import { string, number } from 'prop-types';

class FeedbackHeader extends React.Component {
  render() {
    const { image, name, score } = this.props; /* essas props virão do pai desse componente ou do estado global */
    return (
      <header>
        <img data-testid="header-profile-picture" src={ image } alt="gravatar" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

FeedbackHeader.propTypes = {
  image: string,
  name: string,
  score: number,
}.isRequired;

export default FeedbackHeader;
