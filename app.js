require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./server/config/db');

// Initialize the app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Mydb';

// Connect to the database
connectDB();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
  }),
  // cookie: { maxAge: 3600000 } // Optional: Set cookie expiration
}));

// Serve static files from 'public' folder
app.use(express.static('public'));

// Templating engine
app.use(expressLayout);
app.set('layout', 'layouts/main'); // 'views/layouts/main.ejs' will be used
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
