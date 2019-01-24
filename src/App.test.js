import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import PatientView from './Patient.js'
import DoctorView from './Doctor.js'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
  ReactDOM.render(<PatientView />, div)
  ReactDOM.unmountComponentAtNode(div)
  ReactDOM.render(<DoctorView />, div)
  ReactDOM.unmountComponentAtNode(div)
})
