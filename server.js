const express = require('express');
const connectDb = require('./config/db');
const { port } = require('./config/config');

const app = express();

connectDb();

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to learner API' });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
