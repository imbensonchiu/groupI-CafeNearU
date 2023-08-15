const express = require('express');
const cors = require('cors');

const app = express();
// const hello = require('./routes/helloWorld');

app.use(cors());

app.use(express.json());
app.use(express.static('public'));

// app.use('/', hello);
app.get('/', (req, res) => {
  res.send('Hello World From Cafe Near U');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
