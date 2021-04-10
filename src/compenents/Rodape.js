import React from 'react';
import '../App.css';

class Rodape extends React.Component {
  render() {
    return (
      <div className="Rodape">
        <p>Desenvolved by:</p>
        <img src="https://ca.slack-edge.com/TMDDFEPFU-U01DVFDHT0V-7863b2f479d7-512" alt="Foto Jhonatan" className="Img-rodape" />
        <img src="https://ca.slack-edge.com/TMDDFEPFU-U01BJ3A2C8Z-015d152e3fa3-512" alt="Foto Pedro" className="Img-rodape" />
        <img src="https://ca.slack-edge.com/TMDDFEPFU-U012ESZK2KU-f3134ec03f78-512" alt="Foto Beto" className="Img-rodape" />
      </div>
    );
  }
}

export default Rodape;
