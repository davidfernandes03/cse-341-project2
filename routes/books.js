const router = require('express').Router();
const asyncHandler = require('../middlewares/asyncHandler');
const { bookValidationRules, validate } = require('../middlewares/validation');
const books = require('../controllers/books');

// GET all
router.get('/', 
    /*
    #swagger.tags = ['Books']
    #swagger.description = 'Get all books'
    #swagger.responses[200] = {
        description: 'List of books'
    }
    */
    asyncHandler(books.getAllBooks));

// GET
router.get('/:id', 
    /*
    #swagger.tags = ['Books']
    #swagger.description = 'Get book by ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Book ID',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'Book details'
    }
    */
    asyncHandler(books.getBookById));

// POST
router.post('/', bookValidationRules, validate, 
    /*
    #swagger.tags = ['Books']
    #swagger.description = 'Create a new book'
    #swagger.parameters['book'] = {
        in: 'body',
        description: 'Book data',
        required: true,
        schema: { $ref: '#/definitions/Book' }
    }
    #swagger.responses[201] = {
        description: 'Book successfully created'
    }
    */
    asyncHandler(books.createBook));

// PUT
router.put('/:id', bookValidationRules, validate, 
    /*
    #swagger.tags = ['Books']
    #swagger.description = 'Update a book by ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Book ID',
        required: true,
        type: 'string'
    }
    #swagger.parameters['book'] = {
        in: 'body',
        description: 'Updated book data',
        required: true,
        schema: { $ref: '#/definitions/Book' }
    }
    #swagger.responses[200] = {
        description: 'Book updated'
    }
    */
    asyncHandler(books.updateBook));

// DELETE
router.delete('/:id', 
    /*
    #swagger.tags = ['Books']
    #swagger.description = 'Delete a book by ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Book ID',
        required: true,
        type: 'string'
    }
    #swagger.responses[204] = {
        description: 'Book deleted'
    }
    */
    asyncHandler(books.deleteBook));

module.exports = router;