const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Library API',
        description: 'API for managing books and authors (CSE 341 | BYU-I)'
    },
    host: process.env.NODE_ENV === 'production'
        ? 'cse-341-project2-u397.onrender.com'
        : 'localhost:8080',
    schemes: process.env.NODE_ENV === 'production'
        ? ['https']
        : ['http'],
    definitions: {
        Book: {
            title: 'The Lord of the Rings',
            author: 'J.R.R. Tolkien',
            genre: 'Fantasy',
            publishedYear: 1954,
            pages: 1178,
            publisher: 'HarperCollins',
            language: 'English',
            available: true
        },
        Author: {
            name: 'J.R.R. Tolkien',
            birthYear: 1892,
            nationality: 'British',
            booksWritten: ['The Hobbit', 'The Lord of the Rings']
        }
    },
    securityDefinitions: {
        auth0: {
            type: 'oauth2',
            flow: 'implicit',
            authorizationUrl: 'https://dev-k1mfqbjspokyxg0f.us.auth0.com/authorize',
            scopes: {}
        }
    },
    security: [
        { auth0: [] }
    ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);