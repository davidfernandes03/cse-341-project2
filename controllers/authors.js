const mongodb = require('../database/connect');
const { ObjectId } = require('mongodb');

async function getAllAuthors(req, res) {
    const authors = await mongodb.getDb().collection('authors').find().toArray();
  
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(authors, null, 2));
}

async function getAuthorById(req, res) {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) throw { 
        status: 400, message: 'Invalid author ID format.' 
    };

    const author = await mongodb.getDb().collection('authors').findOne({ _id: new ObjectId(`${id}`) });

    if (!author) throw { 
        status: 404, message: 'Author not found.' 
    };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(author, null, 1));
}

async function createAuthor(req, res) {
    const author = req.body;

    const result = await mongodb.getDb().collection('authors').insertOne(author);
    res.status(201).json({ message: 'Author created', id: result.insertedId });
}

async function updateAuthor(req, res) {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) throw { 
        status: 400, message: 'Invalid author ID.' 
    };

    const result = await mongodb.getDb().collection('authors').updateOne(
        { _id: new ObjectId(`${id}`) }, { $set: req.body }
    );

    if (result.modifiedCount === 0) throw { 
        status: 404, message: 'Author not found or no changes made.' 
    };
    res.status(200).json({ message: 'Author updated!' });
}

async function deleteAuthor(req, res) {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) throw { 
        status: 400, message: 'Invalid author ID.' 
    };

    const result = await mongodb.getDb().collection('authors').deleteOne(
        { _id: new ObjectId(`${id}`) }
    );

    if (result.deletedCount === 0) throw { 
        status: 404, message: 'Author not found.' 
    };
    res.status(200).json({ message: 'Author deleted!' });
}

module.exports = { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };