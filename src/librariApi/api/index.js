const { Router } = require('express');

const { authorRoutes } = require('./authors');
const { bookRoutes } = require('./books');

const route = Router();

route.use('/authors', authorRoutes);
route.use('/books', bookRoutes);

route.get('/*', (req, res) => {
  res.status(404).send({
    error: 'API not found.',
  });
});

module.exports.apiRoutes = route;
