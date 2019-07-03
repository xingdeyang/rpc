let net = require('net')
let port = 4000

let client = net.createConnection(port, '127.0.0.1')
client.on('connect', () => {
    console.log('tcp connection has establish')
    client.write('hello, i am client')
    client.end()
})