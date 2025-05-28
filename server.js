require('dotenv').config();
const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');

// Archives
const { connectToDatabase } = require('./database/connect');
const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors'); 
const errorHandler = require('./middlewares/errorHandler');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// App
const app = express();
const port = process.env.PORT || 8080;

// Auth0 Config
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
};
app.use(auth(config));
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Initialize
app.use(express.json());

// Routes
app.use('/books', requiresAuth(), booksRoutes);
app.use('/authors', requiresAuth(), authorsRoutes);
app.use('/api-docs', requiresAuth(), swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});
app.use(errorHandler);

// Connection
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((error) => {
    console.error(`Mongodb failed to connect: ${error}`);
});