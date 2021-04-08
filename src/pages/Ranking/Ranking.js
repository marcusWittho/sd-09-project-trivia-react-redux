import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { bool, shape } from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { player } = this.props;
    const { validLogin } = player;
    if (!validLogin) return <Redirect to="/" />;
    return (
      <section>
        <h1 data-testid="ranking-title">Hanking</h1>
      </section>
    );
  }
}

Ranking.propTypes = {
  player: shape({
    validLogin: bool,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.playerReducer.player,
});

export default connect(mapStateToProps)(Ranking);
