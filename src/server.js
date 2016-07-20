'use strict';

const hapi = require('hapi');
const path = require('path');
const plugins = ['inert'];
const routes = [
  require('./routes/static'),
  require('./routes/content')

];
const server = new hapi.Server();


server.connection({ port: 3000 });

server.start((starterr) => {
  if (starterr) {
    console.log(starterr);
  }
  console.log('Server running at:', server.info.uri);
});

server.register(require('inert'), (registererr) => {
  server.route(routes);
});

module.exports = server;
