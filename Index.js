const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/proxy', (req, res) => {
    const apiUrl = 'http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?' + req.url.split('?')[1];
    request(apiUrl).pipe(res);
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
