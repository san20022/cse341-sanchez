const express = require('express');

const app = express();

const routes = require('./routes');
const { initDb } = require('./database');

const PORT = process.env.PORT || 3000;

app.use('/', routes);

initDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error);
    });