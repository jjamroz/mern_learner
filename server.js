const express = require('express');
const connectDb = require('./config/db');
const { port } = require('./config/config');

const app = express();

connectDb();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to learner API' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

app.listen(port, () => console.log(`Server started on port ${port}`));
