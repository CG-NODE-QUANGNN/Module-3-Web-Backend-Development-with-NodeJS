const http = require('http');
const fs = require('fs');
const qs = require('qs')
const url = require("url");

const server = http.createServer(function (req, res) {
    // if (req.method === 'GET') {
    //
    // } else {
    //
    // }

    //get url and parse
    var parseUrl = url.parse(req.url, true);
    //
    // //get the path
    var path = parseUrl.pathname;
    var trimPath = path.replace(/^\/+|\/+$/g, '');

    var chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
    try {
        chosenHandler(req, res);
    } catch (e) {
    }
});

server.listen(8080, function () {
    console.log('server running at localhost:8080 ')
});

var handlers = {};
// handlers.caculator
handlers.result = function (req, res) {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })

    req.on('end', () => {
        const calculatorInfo = qs.parse(data);
        fs.readFile('./views/calculator.html', 'utf8', function (err, dataHTML) {
            if (err) {
                console.log(err);
            }

            const firstNumber = +calculatorInfo.firstNumber;
            const secondNumber = +calculatorInfo.secondNumber;
            const operator = calculatorInfo.operator;
            let result;

            switch (operator) {
                case "+":
                    result = firstNumber + secondNumber;
                    break;
                case "-":
                    result = firstNumber - secondNumber;
                    break;
                case "*":
                    result = firstNumber * secondNumber;
                    break;
                case "/":
                    result = firstNumber / secondNumber;
            }

            dataHTML = dataHTML.replace('{result}', `<p>Kết quả: ${result}</p>`);
            dataHTML = dataHTML.replace('{firstNumber}', calculatorInfo.firstNumber);
            dataHTML = dataHTML.replace('{secondNumber}', calculatorInfo.secondNumber);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(dataHTML);
            return res.end();
        });
    })
    req.on('error', () => {
        console.log('error')
    })
};

// handlers.caculator
handlers.caculator = function (rep, res) {
    fs.readFile('./views/calculator.html', 'utf8', function (err, data) {
        data = data.replace('{result}', '');
        data = data.replace('{firstNumber}', '');
        data = data.replace('{secondNumber}', '');

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

//definer the request router
var router = {
    'caculator': handlers.caculator,
    'result': handlers.result
}
