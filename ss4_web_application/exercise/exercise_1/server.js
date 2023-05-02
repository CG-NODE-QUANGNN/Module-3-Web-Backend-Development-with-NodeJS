const http = require('http');
const fs = require('fs');
const qs = require('qs')

let todoList = ['Học Nodejs', 'Học JS']

const server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('./views/calculator.html', function (err, data) {
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
            const nameInfo = qs.parse(data);
            fs.readFile('./views/display.html', 'utf8', function (err, dataHTML) {
                if (err) {
                    console.log(err);
                }

                debugger

                todoList.push(nameInfo.name);

                dataHTML = dataHTML.replace('{ListTodo}', todoList.map((todo, index) => (
                    `
                        <tr>
                            <td scope="row">${index}</td>
                            <td>${todo}</td>
                        </tr>
                    `
                )).join(""));


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
