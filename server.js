const express = require('express');
const cors = require('cors');
const path = require('node:path');

const connectToDatabase = require('./database/connect');
const globalRouter = require('./routes');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(globalRouter);

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});