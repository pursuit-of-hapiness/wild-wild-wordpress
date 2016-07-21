'use strict';

const hapi = require('hapi');

const routes = [
  'static',
  'getContent',
  'postContent',
  'updateContent',
  'deleteContent',
  'login'];

const routesArray = routes.map((el) => {
  return require(`./routes/${el}`);
});
const server = new hapi.Server();


server.connection({ port: 3000 });

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
