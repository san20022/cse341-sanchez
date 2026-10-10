
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API documentation for managing contacts.',
    },
    host: 'cse341-sanchez.onrender.com',
    schemes: ['https'],
    definitions: {
        Contact: {
            firstName: 'Luis',
            lastName: 'Sanchez',
            email: 'luis@example.com',
            favoriteColor: 'Blue',
            birthday: '1990-01-01',
        },
    },
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);