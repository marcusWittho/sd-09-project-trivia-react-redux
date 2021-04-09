import React from 'react';
import { connect } from 'react-redux';
import { getCurrentPlayerInfos } from '../services/localStorage';

class HeaderFeedback extends React.Component {
  render() {
    const { name, gravatarEmail, score } = getCurrentPlayerInfos();
    return (
      <header>
        <section className="section-header">
          <figure>
            <img
              src={ gravatarEmail }
              alt={ `${name}` }
              data-testid="header-profile-picture"
            />
          </figure>
          <div>
            <h2 data-testid="header-player-name">{ name }</h2>
            <h2 data-testid="header-score">{ score }</h2>
          </div>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps, null)(HeaderFeedback);
