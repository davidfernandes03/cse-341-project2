const router = require('express').Router();
const asyncHandler = require('../middlewares/asyncHandler');
const { authorValidationRules, validate } = require('../middlewares/validation');
const authors = require('../controllers/authors');

// GET all
router.get('/', 
    /*
    #swagger.tags = ['Authors']
    #swagger.description = 'Get all authors'
    #swagger.responses[200] = {
        description: 'List of authors'
    }
    */
    asyncHandler(authors.getAllAuthors));

// GET
router.get('/:id', 
    /*
    #swagger.tags = ['Authors']
    #swagger.description = 'Get author by ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Author ID',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'Author details'
    }
    */
    asyncHandler(authors.getAuthorById));

// POST
router.post('/', authorValidationRules, validate, 
    /*
    #swagger.tags = ['Authors']
    #swagger.description = 'Create a new author'
    #swagger.parameters['author'] = {
        in: 'body',
        description: 'Author data',
        required: true,
        schema: { $ref: '#/definitions/Author' }
    }
    #swagger.responses[201] = {
        description: 'Author successfully created'
    }
    */
    asyncHandler(authors.createAuthor));

// PUT
router.put('/:id', authorValidationRules, validate, 
    /*
    #swagger.tags = ['Authors']
    #swagger.description = 'Update an author by ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Author ID',
        required: true,
        type: 'string'
    }
    #swagger.parameters['author'] = {
        in: 'body',
        description: 'Updated author data',
        required: true,
        schema: { $ref: '#/definitions/Author' }
    }
    #swagger.responses[200] = {
        description: 'Author updated'
    }
    */
    asyncHandler(authors.updateAuthor));

// DELETE
router.delete('/:id', 
    /*
    #swagger.tags = ['Authors']
    #swagger.description = 'Delete an author by ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Author ID',
        required: true,
        type: 'string'
    }
    #swagger.responses[204] = {
        description: 'Author deleted'
    }
    */
    asyncHandler(authors.deleteAuthor));

module.exports = router;