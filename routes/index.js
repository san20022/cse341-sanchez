const routes = require('express').Router();

const contacts = require('./contacts');
const swagger = require('./swagger');

routes.use('/contacts', contacts);
routes.use('/api-docs', swagger);

module.exports = routes;