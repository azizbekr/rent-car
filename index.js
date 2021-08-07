const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express()
const router = require('./routes/router')
const port = 80;

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'front/dist')));

app.get(['/', '/sale', '/buy', '/stats', '/login'], (req,res) => {
    res.sendFile(path.join(__dirname, 'front/dist/index.html'));
});

app.use('/api', router)

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});