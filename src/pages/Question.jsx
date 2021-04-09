import React from 'react';
import { connect } from 'react-redux';
import { string, objectOf } from 'prop-types';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.createHeader = this.createHeader.bind(this);
  }

  createHeader() {
    const { playerState: { name, score, gravatarEmail } } = this.props;
    console.log('aparece');
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
          alt="imagem do Gravatar"
          data-testid="header-profile-picture"
        />
        <h4 data-testid="header-player-name">{ name }</h4>
        <h4 data-testid="header-score">{ score }</h4>
        <h2>sss</h2>
      </header>
    );
  }

  render() {
    return (this.createHeader());
  }
}

const mapStateToProps = ((state) => ({
  playerState: state.player,
}));

Question.propTypes = {
  playerState: objectOf({
    name: string,
    gravatarEmail: string,
  }),
}.isRequired;

export default connect(mapStateToProps, null)(Question);
