const express = require('express');
const app = express();
const path = require('path');
const { splitPDF } = require('./splitPDF');
const { renamePDF } = require('./renamePDF');
const { Email } = require('./Email');

app.use(express.static(path.join(__dirname, '.')));

app.get('/splitPDF', async (req, res) => {
    try {
        const result = await splitPDF();
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/renamePDF', async (req, res) => {
    try {
        const result = await renamePDF();
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/Email', async (req, res) => {
    try {
        const result = await Email();
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));