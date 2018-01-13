const express = require('express');

// TODO make the port configurable
const PORT = 4000;

const app = express();

app.get('/', (req, res) => res.send('Welcome to the Widget Sales API'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
