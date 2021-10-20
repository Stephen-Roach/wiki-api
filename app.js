const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000;

const app = express();

mongoose.connect('mongodb://localhost:27017/test');

app.get('/', (req, res) => {
  res.send('Hello HUmans');
});

app.listen(port, () => {
  console.log(`I am listening on port ${port}`);
});
