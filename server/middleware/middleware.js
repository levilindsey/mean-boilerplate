/**
 * @module middleware
 *
 * Exposes the setMiddleware function, which sets up all of the middleware
 * functionality for the server.
 */

var config = require('../config/config');

/**
 * Sets up middleware for the server.
 *
 * @param {Object} server
 */
exports.init = function (server) {
  var morgan = require('morgan'), // For logging
      favicon = require('serve-favicon'), // For serving our favicon
      bodyParser = require('body-parser'), // For parsing urlencoded and json request bodies
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      MongoStore = require('connect-mongo')(session),
      staticFiles = require('./static-files');

  // Set up the templating engine
  server.set('views', __dirname);
  server.set('view engine', 'ejs');

  server.use(morgan({ format: 'dev', immediate: true }));
  server.use(favicon(config.faviconPath));
  server.use(bodyParser());
  server.use(cookieParser());
  server.use(session({
    secret: config.labs.sessionSecret,
    store: new MongoStore({
      mongoose_connection: db.getDatabaseConnection(),
      collection: 'sessions'
    })
  }));

  staticFiles.init(server);
};
