let net = require('net')
let buf = new Buffer(10)
let server = net.createServer(socket => {
    socket.on('data', data => {
        buf.push(data)
    })
    socket.on('end', () => {
        console.log('hello client, i have receive your message:' + buf.toString())
    })
}).listen(4000)