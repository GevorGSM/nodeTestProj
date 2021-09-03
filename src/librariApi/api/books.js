const { Router } = require('express');

const Book = require('../models/Book');

const route = Router();

route.get('/:id', async (req, res) => {
  req.log.info('try to get book by id', req.params.id);
  let book;
  try {
    book = await Book.findById(req.params.id);

  } catch (e) {
    req.log.error('-----------------------------try to get book by id',
      req.params.id, e);
  }

  if (book) {
    res.end(book);
  } else {
    res.end(`book --> ${req.params.id} not found`);
  }
});

route.get('/', (req, res) => {
  let books;
  try {
    books = Book.findAll();
  } catch (e) {
    req.log.error('-----------------------------try to get book by id', e);
    req.log.error(e.message);
  }

  res.end(books || 'Books not found');
});

route.put('/', (req, res) => {
  res.end('book put');
});

route.post('/', (req, res) => {
  const bookData = req.body;
  try {
    const book = new Book({
      ...bookData,
    });
    book.save();
  } catch (e) {
    res.end('books not created post');
  }
});

route.delete('/', (req, res) => {
  try {
    Book.findByIdAndRemove(req.params.id);
    req.log.info('-----------------------------book removed', req.params.id);
  } catch (e) {
    req.log.error('-----------------------------book not deleted',
      req.params.id, e);
  }
  res.end('book delete');
});

module.exports.bookRoutes = route;
