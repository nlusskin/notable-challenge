/* 
    WebSocket mirror
*/
const WS = require('ws')
const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database(':memory:', (res, err) => console.error(err))
db.run(`CREATE TABLE IF NOT EXISTS stack (
  Msg TEXT NOT NULL,
  Mid TEXT NOT NULL )`, (res, err) => console.error(err))


const wss = new WS.Server({port: 3013})
var clients = {0: [], 1: []}
 
wss.on('connection', (ws, req) => {
  var clientID = parseInt(req.url.substr(1), 10)
  clients[clientID].push(ws)
  //console.log('connected: ' + clientID + ' in ' + Object.getOwnPropertyNames(ws))
  console.log(clients[0].length + ', ' + clients[1].length)
  
  //get the current stack and broadcast it to new connections
  db.all('SELECT Msg msg FROM stack', (err, res) => {
    if(err) {
      console.error(err)
      return
    }
    //console.log('response', JSON.stringify(res[0].msg))
    res.forEach(r => {
      console.log(r.msg)
      let client = {0: [], 1: []}
      client[clientID].push(ws)
      sendMessage(JSON.parse(r.msg), client)
    })
  })

  ws.on('message', message => {
    //console.log('received: %s', message)
    let msg = JSON.parse(message)
    sendMessage(msg)
    updateDB(msg)
  })

  function sendMessage(msg, sendTo = clients) {

    //broadcasts to patient side
    sendTo[0].forEach(e => {
      if (e.readyState != WS.OPEN)
        return
      let fname = msg.fname !== undefined ? msg.fname.substr(0,1).toUpperCase() + '.' : undefined
      e.send(`{"cmd": "${msg.cmd}", "fname": "${fname}", "lname": "${msg.lname}", "time": "${msg.time}", "key": "${msg.key}"}`)
    })
    //broadcasts to doctor side
    sendTo[1].forEach(e => {
      if (e.readyState != WS.OPEN)
        return
      e.send(`{"cmd": "${msg.cmd}", "fname": "${msg.fname}", "lname": "${msg.lname}", "email": "${msg.email}", "desc": "${msg.desc != undefined ? JSON.stringify(msg.desc).replace(/["]/g,''):undefined}", "time": "${msg.time}", "key": "${msg.key}"}`)
    })
  }
 
})


function updateDB(m) {
  switch(m.cmd) {
    case 'push':
      db.run(`INSERT INTO stack (Msg, Mid) VALUES ('${JSON.stringify(m)}', "${m.key}")`, (err, res) => console.error(err))
      break
    case 'pop':
      db.run(`DELETE FROM stack WHERE Mid = "${m.key}"`, (err, res) => console.error(err))
      break
  }
}

setInterval(() => {
    wss.clients.forEach(client => {
      client.send('{"cmd": "keepAlive"}')
    })      
  }, 28000)

  process.on('uncaughtException', exception => console.error(exception))



/*
    http server
*/
const express = require('express')
const favicon = require('express-favicon')
const path = require('path')

const app = express()
app.use(favicon(__dirname + '/build/favicon.ico'))
// __dirname = directory from where the script is running
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'build')))

app.get('/ping', function (req, res) {
 return res.send('pong')
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(5000)