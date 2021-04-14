import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';

class Feedback extends React.Component {
  render() {
    const { score, assertions } = this.props;
    const averageAssertions = 3;
    const disappointment = 'Podia ser melhor...';
    const congratulations = 'Mandou bem!';

    return (
      <>
        <Header />
        <section>
          <h3 data-testid="feedback-text">
            {assertions < averageAssertions ? disappointment : congratulations}
          </h3>
          <h4 data-testid="feedback-total-score">
            {score}
          </h4>
          <h4 data-testid="feedback-total-question">{ assertions }</h4>
        </section>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.login.score,
  assertions: state.login.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
