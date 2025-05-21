const router = require('express').Router();
const asyncHandler = require('../middlewares/asyncHandler');
const { authorValidationRules, validate } = require('../middlewares/validation');
const authors = require('../controllers/authors');

router.get('/', asyncHandler(authors.getAllAuthors));
router.get('/:id', asyncHandler(authors.getAuthorById));
router.post('/', authorValidationRules, validate, asyncHandler(authors.createAuthor));
router.put('/:id', authorValidationRules, validate, asyncHandler(authors.updateAuthor));
router.delete('/:id', asyncHandler(authors.deleteAuthor));

module.exports = router;