const routes = require('express').Router();

const contactsController = require('../controllers/contacts');

routes.get('/', contactsController.getAllContacts);

routes.get('/single', contactsController.getSingleContact);

module.exports = routes;