const { Router } = require('express');

const route = Router();

route.get('/', (req, res) => {
  res.end('author GET');
});

route.put('/', (req, res) => {
  res.end('author put');
});

route.post('/', (req, res) => {
  res.end('author post');
});

route.delete('/', (req, res) => {
  res.end('author delete');
});

module.exports.authorRoutes = route;
