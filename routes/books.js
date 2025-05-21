const router = require('express').Router();
const asyncHandler = require('../middlewares/asyncHandler');
const { bookValidationRules, validate } = require('../middlewares/validation');
const books = require('../controllers/books');

router.get('/', asyncHandler(books.getAllBooks));
router.get('/:id', asyncHandler(books.getBookById));
router.post('/', bookValidationRules, validate, asyncHandler(books.createBook));
router.put('/:id', bookValidationRules, validate, asyncHandler(books.updateBook));
router.delete('/:id', asyncHandler(books.deleteBook));

module.exports = router;