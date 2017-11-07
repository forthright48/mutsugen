const express = require('express');
const config = require('config');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const rootPath = config.rootPath;

app.set('port', config.port);
app.set('view engine', 'pug');
app.set('views', path.join(rootPath, './views'));

app.use('/public', express.static(path.join(rootPath, '/public')));

/** Configuration */
require('./config/database');
require('./config/session').addSession(app);
app.use(require('connect-flash')());

/* Middleware*/
app.use(require('./middlewares/flash.js'));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('*', function(req, res) {
  return res.status(404).render('404');
});

if (require.main === module) {
  server.listen(app.get('port'), function() {
    console.log(`Server running at port ${app.get('port')}`);
  });
} else {
  module.exports = {
    server,
    app,
  };
}
