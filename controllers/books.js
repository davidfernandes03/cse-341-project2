const mongodb = require('../database/connect');
const { ObjectId } = require('mongodb');

async function getAllBooks(req, res) {
    const books = await mongodb.getDb().collection('books').find().toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(books, null, 2));
}

async function getBookById(req, res) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) throw {
        status: 400, message: 'Invalid book ID format.' 
    };

    const book = await mongodb.getDb().collection('books').findOne({ _id: new ObjectId(`${id}`) });

    if (!book) throw {
        status: 404, message: 'Book not found.' 
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(book, null, 2));
}

async function createBook(req, res) {
    const book = req.body;

    const result = await mongodb.getDb().collection('books').insertOne(book);
    res.status(201).json({ 
        message: 'Book created', id: result.insertedId 
    });
}

async function updateBook(req, res) {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) throw { 
        status: 400, message: 'Invalid book ID.'
    };

    const result = await mongodb.getDb().collection('books').updateOne(
        { _id: new ObjectId(`${id}`) }, { $set: req.body }
    );

    if (result.modifiedCount === 0) throw { 
        status: 404, message: 'Book not found or no changes made.' 
    };
    res.status(200).json({ message: 'Book updated!' });
}

async function deleteBook(req, res) {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) throw { 
        status: 400, message: 'Invalid book ID.' 
    };

    const result = await mongodb.getDb().collection('books').deleteOne(
        { _id: new ObjectId(`${id}`) }
    );

    if (result.deletedCount === 0) throw { 
        status: 404, message: 'Book not found.' 
    };
    res.status(200).json({ message: 'Book deleted!' });
}

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };