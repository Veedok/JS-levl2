const http = require('http');
const { Socket } = require('node:dgram');
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('helow world');
        res.end();
    }
});

server.listen(3000);
server.on('connection', () => {
    console.log("new conecton", Socket)
})