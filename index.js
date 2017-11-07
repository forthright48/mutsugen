const express = require('express');
const config = require('config');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);
const rootPath = config.rootPath;

app.set('port', config.port);
app.set('view engine', 'pug');
app.set('views', path.join(rootPath, './views'));

app.use('/public', express.static(path.join(rootPath, '/public')));

/** Database **/
require('./config/database');

/** Configuration */
require('./config/session').addSession(app);
app.use(require('connect-flash')());
app.use(bodyParser.json({limit: '100kb'})); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '100kb',
})); // support encoded bodies

/* Middleware*/
app.use(require('./middlewares/flash.js'));

app.use(function(err, req, res, next) {
  console.error(err);
  req.flash('error', 'Some error occured');
  return res.redirect('/');
});

app.get('*', function(req, res) {
  return res.status(404).render('404');
});

server.listen(app.get('port'), function() {
  console.log(`Server running at port ${app.get('port')}`);
});
