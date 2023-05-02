const http = require('http');
const fs = require('fs');
const qs = require('qs')

const server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('./views/calculator.html', 'utf8', function (err, data) {
            data = data.replace('{result}', '');
            data = data.replace('{firstNumber}', '');
            data = data.replace('{secondNumber}', '');

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    } else {
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
    }
});

server.listen(8080, function () {
    console.log('server running at localhost:8080 ')
});
