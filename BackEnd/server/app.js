const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
// const hello = require('./routes/helloWorld');

app.use(cors());

app.use(express.json());
app.use(express.static('public'));

// app.use('/', hello);
app.get('/', (req, res) => {
  res.send('Hello World From Cafe Near U');
});

const userRoutes = require('./routes/userRoute');

app.use('/users', userRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
