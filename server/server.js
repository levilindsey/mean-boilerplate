/**
 * @module server
 *
 * Exposes the createServer function, which creates the server instance, sets
 * up the middleware, and attaches the route handlers.
 */

/**
 * Sets up the server.
 */
exports.init = function () {
  var deferred = require('q').defer(),
      server = require('express')(),
      db = require('./database/db'),
      middleware = require('./middleware/middleware'),
      routes = require('./routes/routes'),
      config = require('./config/config');

  db.init();
  middleware.init(server);
  routes.init(server);

  // Clean up some system state for development and testing
  if (config.environment === 'development') {
    db.clear();
  }

  deferred.resolve(server);

  return deferred.promise;
};
