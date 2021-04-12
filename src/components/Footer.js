import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="in-game-footer">
        <div>
          <div>
            <p>
              Made with
              <strong> ❤ </strong>
              by:
            </p>
          </div>
          <div>
            <a href="https://github.com/cezene">Cezene</a>
            <span>, </span>
            <a href="https://github.com/henrique3g">Henrique</a>
            <span>, </span>
            <a href="https://github.com/igmriegel">Igor</a>
            <span> and </span>
            <a href="https://github.com/LeonarDev">Leonardo</a>
            <span role="img" aria-label="Smile Emoji (Eyes closed)"> 😁.</span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
