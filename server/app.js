const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const newsletterRoutes = require('./routes/newsletter');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB (update the URL as needed)
mongoose.connect('mongodb://localhost/my_blog', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/newsletter', newsletterRoutes);

module.exports = app;
