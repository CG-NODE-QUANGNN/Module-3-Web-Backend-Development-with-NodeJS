const http = require("http");
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer((req, res) => {
    var parseUrl = url.parse(req.url, true);
    var queryStringObject = parseUrl.query;

    res.end('Hello Node Js');
    console.log(queryStringObject);
})

server.listen(8080, "127.0.0.1")
