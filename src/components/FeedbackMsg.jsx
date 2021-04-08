import React from 'react';
import { connect } from 'react-redux';

class FeedbackMsg extends React.Component {
  // verifyNumberOfPoints() {
  //   const { pointCounter } = this.props;
  //   if (pointCounter < 3) {
  //     return "Podia ser melhor..."
  //   } else {
  //     return "Mandou bem!"
  //   }
  // }

  render() {
    return (
      <div>
        <p data-testid="feedback-text">Message</p>
      </div>
      // <p data-testid="feedback-text">{ this.verifyNumberOfPoints() }</p>
    );
  }
}

// const mapStateToProps = (state) ({
//   pointCounter: state.handleScore.score;
// });

export default connect(mapStateToProps)(FeedbackMsg);
