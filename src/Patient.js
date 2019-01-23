import React, { Component } from 'react';
import Data from './Data';
 

function List(p) {
  if (p.i === null)
    return (<p>No patient currently waiting</p>)
  return (
    <div id="patientListItem">
      <div><p>{p.i.fname} {p.i.lname}</p></div>
      <div><p className="datetime">{p.i.time}</p></div>
    </div>
  )
}


class PatientView extends Component {

  constructor(p) {
    super(p)
    this.state = {listItems: [], currentItem: null, fname: '', lname: '', email: '', desc: ''}
    this.setState = this.setState.bind(this)
    this.submitNewPatient = this.submitNewPatient.bind(this)
    this.data = new Data(this, 0)
  }

 

  submitNewPatient(e) {
    e.preventDefault()
    if (this.state.submitSuccess)
      return
    console.log(this.state.fname + ' ' + this.state.lname)
    let z = this.state
    this.data.push(z.fname, z.lname, z.email, z.desc)
    this.setState({submitSuccess: true})
    setTimeout(() => this.setState({submitSuccess: false, fname: '', lname: '', email: '', desc: ''}), 2000)
  }


  render() {
      return (
        <div>
          <form id="submitNewPatient" onSubmit={this.submitNewPatient}>
            <h1>Patient Log in</h1>
            <input type='text' placeholder='First Name' value={this.state.fname} onChange={(e) => this.setState({fname: e.target.value})} required /><br></br>
            <input type='text' placeholder='Last Name' value={this.state.lname} onChange={(e) => this.setState({lname: e.target.value})} required /><br></br>
            <input type='email' placeholder='Email' value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} required /><br></br>
            <textarea placeholder='Description of Condition' style={{height: '150px'}} value={this.state.desc} onChange={(e) => this.setState({desc: e.target.value})} required /><br></br>
            <input type='submit' value={this.state.submitSuccess ? "You're on the list!" : "Submit"} className={this.state.submitSuccess ? "submitSuccess" : ""} />
          </form>
          <div id='patientListContainer'>
            {(this.state.listItems.length == 0 && this.state.currentItem == null) ? <h2>No Patients Currently Waiting</h2> : <div><h2>Current Patient:</h2><List i={this.state.currentItem} /><h2>Patients Currently Waiting:</h2> {this.state.listItems.slice(this.state.currentItem != null ? 1:0).map(v => <List i={v} />)}</div>}
          </div>
        </div>
      )
  }
}

export default PatientView