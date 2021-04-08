import React from 'react';
import { connect } from 'react-redux';
import { getCurrentPlayerInfos } from '../services/localStorage';

class HeaderFeedback extends React.Component {
  render() {
    const { name, picture, score } = getCurrentPlayerInfos();
    return (
      <header>
        <section>
          <span data-testid="header-player-name">{ name }</span>
          <figure>
            <img
              src={ picture }
              alt={ `${name}` }
              data-testid="header-profile-picture"
            />
          </figure>
          <span data-testid="header-score">{Number(score)}</span>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps, null)(HeaderFeedback);
