// Creating an instantiation of 'Data' creates a Data class with all bindings
// assuming context ('context', 'side') is provided

class Data {

  constructor(context, side) {
    this.context = context
    this.connect(side)
  }

  connect(side) {
    this.socket = new WebSocket('ws://ec2-18-221-109-152.us-east-2.compute.amazonaws.com:3013/'+side)
    //this.socket = new WebSocket('ws://localhost:3013/'+side)
    this.socket.onopen = function(event) {
      console.log('Connected to: ' + event.currentTarget.url)
      //socket.send('test')
    }
    this.handleIncoming()

    this.socket.onerror = (e) => {
      console.log('Error: ' + e)
      alert('There was an error connecting to the service')
    }
    this.socket.onclose = c => {
      alert("Connection lost. Refresh page to reconnect")
    }

  }

  handleIncoming() {
    this.socket.onmessage = m => {
      
      let msg = JSON.parse(m.data)
      switch(msg.cmd) {
        case 'push':
          this.addPatient(msg)
          break
        case 'pop':
          this.removePatient(msg)
          break
        case 'current':
          this.setCurrentPatient(msg)
          break
        case 'unsetCurrent':
          this.removeCurrentPatient()
          break
      }
    }
  }

  addPatient(m) {
    var arr = this.context.state.listItems
    arr.push(m)
    this.context.setState({listItems: arr})
  }

  removePatient(m, i = -1) {
    this.context.state.listItems.forEach(e => {
      i++
      if (e.key != m.key)
        return
      let arr = this.context.state.listItems
      arr.splice(i,1)
      this.context.setState({listItems: arr, currentItem: null})
    })
  }

  setCurrentPatient(m = null, i = -1) {
    if (m === null) {
      this.context.setState({currentItem: null})
      return
    }
    this.context.state.listItems.forEach(e => {
      i++
      if (e.key != m.key)
        return
      this.context.setState({currentItem: e})
    })
  }


  // api-esque funcs
  push(fname, lname, email, desc) {
    function cl(v) { return v.replace(/["]/g, '\'') }
    this.socket.send(`{"cmd": "push", "fname": "${cl(fname)}", "lname": "${cl(lname)}", "email": "${email}", "desc": ${JSON.stringify(cl(desc))}, "time": "${timestamp()}", "key": "${uuid()}"}`)
  }
  pop(key) {
    this.socket.send(`{"cmd": "pop", "key": "${key}"}`)
  }
  setCurrent(key) {
    this.socket.send(`{"cmd": "current", "key": "${key}"}`)
  }
  unsetCurrent(key) {
    this.socket.send(`{"cmd": "unsetCurrent", "key": "${key}"}`)
  }
}


function uuid() {
  return 'xxxxxxxx'.replace(/[xy]/g, c => {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  })
}

function timestamp() {
  let date = new Date()
  let hour = date.getHours() % 12 + ((date.getHours() == 12 || date.getHours() == 0) ? 12 : 0)
  let min = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()
  let noon = ((date.getHours() > 11) ? 'PM' : 'AM')
  let time = hour + ':' + min + '' + noon
  return time
}

export default Data