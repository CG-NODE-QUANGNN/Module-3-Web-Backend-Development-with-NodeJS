var http = require("http");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;

var handlers = {};

handlers.sample = function (data, callback) {
    callback(406, {'name': 'sample handle'})
};

handlers.notFound = function (data, callback) {
    callback(404);
}

handlers.home = function (data, callback) {
    callback(200, 'home page')
}

var router = {
    'sample': handlers.sample,
    'home': handlers.home
}

const server = http.createServer((req, res) => {
    var parseUrl = url.parse(req.url, true);
    var path = parseUrl.pathname;
    var trimPath = path.replace(/^\/+|\/+$/g, '');

    req.on('data', function (data) {
    });
    req.on('end', function (end) {
        var chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
        var data =
            {
                "trimPath": trimPath
            }
        ;

        chosenHandler(data, function (statusCode, payload) {
            debugger
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object' ? payload : {};
            var payLoadString = JSON.stringify(payload);
            res.writeHead(statusCode)
            res.end(payLoadString);
            //log the request
            console.log("status " + statusCode + "payload" + payload);
        });

    });
});

server.listen(3002, '127.0.0.1');
