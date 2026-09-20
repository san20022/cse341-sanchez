const routes = require('express').Router();

const controller = require('../controllers');

routes.get('/', controller.awesomeFunction);

module.exports = routes;