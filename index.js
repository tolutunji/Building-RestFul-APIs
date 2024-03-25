const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const port = 3100;

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl);

    const path = parsedUrl.pathname;
    console.log(path);

    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    console.log(trimmedPath);

    const method = req.method.toUpperCase();
    console.log(method);

    const queryStringObject = parsedUrl.query;
    console.log(queryStringObject);

    const headers = req.headers;
    console.log(headers);

    const decoder = new StringDecoder('utf-8');

    let buffer = '';

    req.on('data', (data, callback) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();
        
        console.log(buffer);
    })


    res.write("Life is but a dream!");
    res.end();
});




server.listen(port, () => {
    console.log(`Server active on port ${port}`);
})