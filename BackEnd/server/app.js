const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World From Cafe Near U');
});

const homeRoutes = require('./routes/homeRoute');
const userRoutes = require('./routes/userRoute');
const shopOwnerRoutes = require('./routes/shopOwnerRoute');
const shopRoutes = require('./routes/shopRoute');

app.use('/api/1.0/home', homeRoutes);
app.use('/api/1.0/users', userRoutes);
app.use('/api/1.0/shop-owners', shopOwnerRoutes);
app.use('/api/1.0/shops', shopRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
