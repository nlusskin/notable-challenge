import React, { Component } from 'react';
import './App.css';
import PatientView from './Patient.js'
import DoctorView from './Doctor.js'


 

class App extends Component {

  constructor(p) {
    super(p)
    this.state = {currentView: 0}
    this.setState = this.setState.bind(this)
  }
  
 ViewFactory(p) {
 
  }

  render() {
      switch (this.state.currentView) {
      case 0:
        return (
          <div className="App">
            <h1>Choose View:</h1>
            <button id="chooseView" onClick={() => this.setState({currentView: 1})}>Patient</button><br></br>
            <button id="chooseView" onClick={() => this.setState({currentView: 2})}>Doctor</button>
          </div>
        )
      case 1: //patient
        return (
          <div className="App">
            <PatientView />
          </div>
          
        )
      case 2: //doctor
        return (
          <div className="App">
            <h1 className='header'>Doctor</h1>
            <DoctorView />
          </div>
        )
    }
  }
}

export default App;
