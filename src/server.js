'use strict';
require('env2')('config.env');
const ironPassword = process.env.ironPassword;

const hapi = require('hapi');
const plugins = ['inert'];
const routes = [
  'static',
  'getContent',
  'postContent',
  'updateContent',
  'deleteContent',
  'registerUser',
  'loginUser'];

const routesArray = routes.map((el) => require(`./routes/${el}`));

const server = new hapi.Server();


server.connection({ port: 3000 });

server.state('session', {
  ttl: 24 * 60 * 60 * 1000,     // One day
  isSecure: true,
  path: '/',
  encoding: 'iron',
  password: ironPassword,
});

server.start((starterr) => {
  if (starterr) {
    console.log(starterr);
  }
  console.log('Server running at:', server.info.uri);
});

server.register(require(plugins[0]), (registererr) => {
  if (registererr) console.log(registererr);
  server.route(routesArray);
});

module.exports = server;
