import React, { Component } from 'react';
import Layout from './Components/Layouts/Layout';
import Metronome from './Containers/Metronome';
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="MainApp">
          <Metronome></Metronome>
      </div>
    );
  }
}

export default App;
