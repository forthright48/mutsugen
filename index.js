const express = require('express');
const world = require('forthright48/world');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const rootPath = world.rootPath;

app.set('port', 80);
app.set('view engine', 'pug');
app.set('views', path.join(rootPath, './views'));

app.use('/public', express.static(path.join(rootPath, '/public')));

app.use(function(err, req, res) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('*', function(req, res) {
  return res.status(404).send('Page not found\n');
});

if (require.main === module) {
  server.listen(app.get('port'), function() {
    console.log(`Server running at port ${app.get('port')}`);
  });
} else {
  module.exports = {
    server,
    app
  };
}
