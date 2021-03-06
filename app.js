const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const SERVER_PORT = process.env.PORT || 8080;

let server = null;

app.use(express.static('public'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static/About.html'));
});
app.get('/support', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static/Support.html'));
});
app.get('/career', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static/Career.html'));
});

app.get('/Contact', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static/Contact_us.html'));
});

server = app.listen(SERVER_PORT, '0.0.0.0', () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
