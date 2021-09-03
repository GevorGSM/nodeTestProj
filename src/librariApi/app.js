const express = require('express');
const mongoose = require('mongoose');
const pino = require('express-pino-logger')();

const { apiRoutes } = require('./api');

const app = express();

app.use(pino);
app.use(express.json());

mongoose.connect('mongodb+srv://gevorg:Gsm1994@cluster0-xlchi.mongodb.net/test?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(res => {
    console.log('Monguse connected');
  });

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Page not found.',
  });
});

app.listen(3000, () => {
  console.log('Server on port 3000');
});
