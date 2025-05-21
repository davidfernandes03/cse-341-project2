const { body, validationResult } = require('express-validator');

const bookValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('genre').notEmpty().withMessage('Genre is required'),
    body('publishedYear').isInt().withMessage('Published year must be an integer'),
    body('pages').isInt().withMessage('Pages must be an integer'),
    body('publisher').notEmpty().withMessage('Publisher is required'),
    body('language').notEmpty().withMessage('Language is required'),
    body('available').isBoolean().withMessage('Available must be true or false'),
];

const authorValidationRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('birthYear').isInt().withMessage('Birth year must be an integer'),
    body('nationality').notEmpty().withMessage('Nationality is required'),
    body('booksWritten').isArray().withMessage('booksWritten must be an array'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const extracted = error.array().map(err => ({
            [err.param || err.path]: err.msg
        }));
        return res.status(422).json({ errors: extracted });
    }
    next();
};

module.exports = { bookValidationRules, authorValidationRules, validate };