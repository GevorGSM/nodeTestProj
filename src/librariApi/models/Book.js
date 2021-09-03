const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  description: String,
  views: Number,
  author: String,
  pagCount: Number,
});

module.exports = mongoose.model('Book', bookSchema);
