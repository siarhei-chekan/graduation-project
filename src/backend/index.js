const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const tasksRouter = require('./tasks');

const PORT = 3000;
const app = express();

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());
app.use('/', tasksRouter);

app.get('/', (req, res) => {
    res.send('Hello. I am Ok!');
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/`);
});