import React, { Component } from 'react';
import Data from './Data.js'
 

var imgs = ['craig.png', 'elliot.jpg', 'helen.jpg', 'joe.jpg', 'justen.jpg', 'karen.png', 'kristy.png', 'matt.jpg', 'matthew.png'], tk = {}, inn = -1
function List(p) {
  if (p.i === null)
    return (<td><p>No current patient</p></td>)
  inn = (Math.random() * 10) % 9 | 0
  if (tk[p.i.key] === undefined)
    tk[p.i.key] = inn
  return (
    <td>
      <div id="doctorListItem">
        <img src={'/' + imgs[tk[p.i.key]]} />
        <div id='dContainer'>
          <div id='dView'>
            <p>{p.i.fname} {p.i.lname}</p>
            <p>{p.i.email}</p>
            <p>{p.i.desc.substr(0, 70) + ((p.i.desc.length > 70) ? '...' : '')}</p>
          </div>
          <div id='dAction'>
            <button onClick={() => p.y ? confirmRemove(p) : (p.c.state.currentItem == null ? setCurrent(p) : alert('You must finish with the current patient first'))} disabled={(p.i.key != p.c.state.listItems[0].key) ? true : false}>{p.y ? '\u2713' : '\u2b70'}</button><br></br>
            <button onClick={() => p.c.setState({descModal: {show: true, content: p.i}})}><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDQ4NS4yMTMgNDg1LjIxMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDg1LjIxMyA0ODUuMjEzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDcxLjg4Miw0MDcuNTY3TDM2MC41NjcsMjk2LjI0M2MtMTYuNTg2LDI1Ljc5NS0zOC41MzYsNDcuNzM0LTY0LjMzMSw2NC4zMjFsMTExLjMyNCwxMTEuMzI0ICAgIGMxNy43NzIsMTcuNzY4LDQ2LjU4NywxNy43NjgsNjQuMzIxLDBDNDg5LjY1NCw0NTQuMTQ5LDQ4OS42NTQsNDI1LjMzNCw0NzEuODgyLDQwNy41Njd6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiNGOUY5RjkiIGRhdGEtb2xkX2NvbG9yPSIjRjZGMkYyIj48L3BhdGg+CgkJPHBhdGggZD0iTTM2My45MDksMTgxLjk1NUMzNjMuOTA5LDgxLjQ3MywyODIuNDQsMCwxODEuOTU2LDBDODEuNDc0LDAsMC4wMDEsODEuNDczLDAuMDAxLDE4MS45NTVzODEuNDczLDE4MS45NTEsMTgxLjk1NSwxODEuOTUxICAgIEMyODIuNDQsMzYzLjkwNiwzNjMuOTA5LDI4Mi40MzcsMzYzLjkwOSwxODEuOTU1eiBNMTgxLjk1NiwzMTguNDE2Yy03NS4yNTIsMC0xMzYuNDY1LTYxLjIwOC0xMzYuNDY1LTEzNi40NiAgICBjMC03NS4yNTIsNjEuMjEzLTEzNi40NjUsMTM2LjQ2NS0xMzYuNDY1Yzc1LjI1LDAsMTM2LjQ2OCw2MS4yMTMsMTM2LjQ2OCwxMzYuNDY1ICAgIEMzMTguNDI0LDI1Ny4yMDgsMjU3LjIwNiwzMTguNDE2LDE4MS45NTYsMzE4LjQxNnoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6I0Y5RjlGOSIgZGF0YS1vbGRfY29sb3I9IiNGNkYyRjIiPjwvcGF0aD4KCQk8cGF0aCBkPSJNNzUuODE3LDE4MS45NTVoMzAuMzIyYzAtNDEuODAzLDM0LjAxNC03NS44MTQsNzUuODE2LTc1LjgxNFY3NS44MTZDMTIzLjQzOCw3NS44MTYsNzUuODE3LDEyMy40MzcsNzUuODE3LDE4MS45NTV6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiNGOUY5RjkiIGRhdGEtb2xkX2NvbG9yPSIjRjZGMkYyIj48L3BhdGg+Cgk8L2c+CjwvZz48L2c+IDwvc3ZnPg==" /></button><br></br>
          </div>
        </div>
      </div>
    </td>
  )
}

function DescriptionModal(p) {
  return (
    <modal>
      <div id='modal-bg'></div>
      <div id='modal'>
        <div style={{width: '100%', height: '60px'}}>
          <img src={'/' + imgs[tk[p.i.key]]} />
          <button onClick={() => { (p.i.key != p.c.state.currentItem.key || p.i.key != p.c.state.currentItem.key) ? alert('You must finish with the current patient first') : confirmRemove(p)}}>&#10004;</button>
          <button onClick={() => p.c.setState({descModal: {show: false}})}>&#10550;</button>
        </div><br></br>
        <p><b>Name:</b> {p.i.fname} {p.i.lname}</p><br></br>
        <p><b>Email:</b> {p.i.email}</p><br></br>
        <p><b>Description:</b> {p.i.desc.replace(/[\u21b5]/g,'\n')}</p><br></br>
      </div>
    </modal>
  )
}

function setCurrent(p) {
  p.c.data.setCurrent(p.i.key)
  p.c.setState({descModal: {show: true, content: p.i}})
}
function confirmRemove(p) {
  let c = window.confirm("Are you sure you are done with the current patient?")
  if (c){
    p.c.data.pop(p.i.key)
    p.c.setState({descModal: {show: false}})
  }
}

class DoctorView extends React.Component {

  constructor(p) {
    super(p)
    this.state = {listItems: [], currentItem: null, descModal: {show: false}}
    this.setState = this.setState.bind(this)
    this.data = new Data(this, 1)
  }


  render() {
      return (
        <div id='doctorListContainer'>
          <table><tr>
          {(this.state.listItems.length == 0 && this.state.currentItem == null) ? <label>No Patients Currently Waiting</label> : <div><label>Current Patient:</label> <br></br><List i={this.state.currentItem} y={true} c={this} /> {this.state.listItems.slice(this.state.currentItem != null ? 1:0).map(v => <List i={v} c={this} /> )}</div>}
          </tr></table>
          {this.state.descModal.show ? <DescriptionModal i={this.state.descModal.content} c={this} /> : null}
        </div>
      )
  }
}

export default DoctorView