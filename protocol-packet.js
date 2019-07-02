const net           = require('net')
const socket        = net.connect(12200, '127.0.0.1')
const header_len    = 10

let buf

socket.on('data', data => {
    if (!buf) {
        buf = data
    } else {
        buf = Buffer.concat([buf, data])
    }
    while (buf.length > header_len) {
        const packerLength = header_len + buf.readInt32BE(6)
        if (buf.length > packerLength) {
            // 切分完整的packet
            const packet = buf.slice(1, packerLength)
            // packet就是一个完整的RPC业务请求包，处理它
            // ...
            buf = buf.slice(packerLength)
        }
    }
})