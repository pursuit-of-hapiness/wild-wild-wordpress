'use strict';
require('env2')('config.env');
const ironPassword = process.env.ironPassword;

const hapi = require('hapi');

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
  ttl: 24 * 60 * 60 * 1000,
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

server.register([require('inert'), require('vision')], (registererr) => {
  if (registererr) console.log(registererr);
  server.route(routesArray);
  server.views({
    engines: {
      html: {
        module: require('handlebars'),
        compileMode: 'sync',
      },
    },
    relativeTo: __dirname,
    path: '../views/templates',
    layout: 'default',
    layoutPath: '../views/layouts',
    helpersPath: '../views/helpers',
    partialsPath: '../views/partials',
  });
});

module.exports = server;
