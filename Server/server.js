const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 4000;
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./Config/db');
const routes = require('./routes');
const methodOverride = require('method-override');
const http = require('http');
const server = http.createServer(app);

// CORS
app.use(
    cors({
        // origin: 'https://2f8d-2402-800-631c-ccbf-f5e8-fffd-6da2-3f04.ngrok-free.app' || '*',
        origin: process.env.BASE_URL_CLIENT || '*',
        credentials: true,
    }),
);

// Middleware BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// Call API
db.connect();

routes(app);

server.listen(port, () => {
    console.log(`SERVER OK on :http//localhost:${port}`);
});
