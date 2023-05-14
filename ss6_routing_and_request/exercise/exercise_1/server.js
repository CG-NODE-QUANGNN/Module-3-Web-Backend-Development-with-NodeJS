const http = require('http');
var url = require('url');
const fs = require('fs');
const qs = require('qs')

let name;

let server = http.createServer(function (req, res) {
    //get url and parse
    var parseUrl = url.parse(req.url, true);
    //
    // //get the path
    var path = parseUrl.pathname;
    var trimPath = path.replace(/^\/+|\/+$/g, '');

    name = qs.parse(req.url.substring(req.url.indexOf('?') + 1)).name;
    // console.log(name)

    var chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
    try {
        chosenHandler(req, res);
    } catch (e) {
    }
});


server.listen(3000, function () {
    console.log('server running at localhost:3000 ')
});

var handlers = {};

// home page
handlers.home = function (rep, res) {
    fs.readFile('./view/home.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

// login page
handlers.login = function (rep, res) {
    fs.readFile('./view/login.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

// login page
handlers.profile = function (rep, res) {
    fs.readFile('./view/profile.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        data = data.toString().replace('{usename}', `<span style="color: red">${name}</span>`);
        res.write(data);
        return res.end();
    });
};

// not found
handlers.notFound = function (rep, res) {
    fs.readFile('./view/notfound.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

//definer the request router
var router = {
    'home': handlers.home,
    'login': handlers.login,
    'profile': handlers.profile
}
