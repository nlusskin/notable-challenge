# Dependencies
-  [React, React-DOM, React-Scripts](https://npmjs.com/package/react)
-  [ExpressJS](https://npmjs.com/package/express)
- [ExpressJS-Favicon](https://npmjs.com/package/express-favicon)
- [SQLite3](https://npmjs.com/package/sqlite3)
- [WS](https://npmjs.com/package/ws)

These can be installed by running:<br>
`npm install --save express express-favicon sqlite3 react react-dom react-scripts ws sqlite3`

# Building

To run app locally, use script `npm start` to start the React server and then `node server.js` from the `server` folder to start the backend<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. Page will update with edits automatically and all errors are displayed verbosely

All static assets (images, files, etc.) go into the `public` folder


Before publishing, use script `npm run build` in the project directory to generate the production package

# Publishing

Publishing happens after the build is completed

On your server, place the `build` folder and `server.js` file in the same directory. Ensure all the above dependencies are installed

Run `node server.js` to start the server

### Note:
The server listens by default on ports `5000` and `3013`<br>
* Port `5000` is the Express http server
* Port `3013` is the WebSocket server which is required for the patient and doctor sides to communicate and includes the SQLite database


You must either open these ports for incoming connections or change them in `server.js`<br>
If you are using provided port `5000` for the http server, you can forward default port `80` (or `443` for https) for http connections to Express using something like<br>
`iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 5000`