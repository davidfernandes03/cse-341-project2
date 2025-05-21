const express = require('express');
require('dotenv').config();

const { connectToDatabase } = require('./database/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const errorHandler = require('./middlewares/errorHandler');

const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((error) => {
    console.error(`Mongodb failed to connect: ${error}`);
});