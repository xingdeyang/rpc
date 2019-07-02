// 协议编码

const payload = {
    service: 'com.alipay.nodejs.helloService:1.0',
    methodName: 'plus',
    args: '[1,2]'
}
const body = new Buffer(JSON.stringify(payload))
const header = new Buffer(10)
// 第一个字节标识请求还是响应
header[0] = 0
// 第二至五字节标识id
header.writeInt32BE(1000,1)
// 第六个字节标识序列化协议，这里1代表json
header[5] = 1
// 最后四个字节标识payload长度
header.writeInt32BE(body.length, 6)

// 最终的rpc协议包
const packet = Buffer.concat([header, body], 10 + body.length)

console.log(packet)


// 协议解码

const type = packet[0]
console.log('RPC请求类型' + type)

const requestId = packet.readInt32BE(1)
console.log('RPC当前请求id: ' + requestId)

const formatType = packet[5]
console.log('RPC业务数据序列化格式类型为：' + formatType + ', 也即为json')

const bodyLen = packet.readInt32BE(6)
console.log('RPC请求实体的长度为：' + bodyLen)

const _payload = packet.slice(10, 10 + bodyLen)
console.log('RPC请求实体数据为：' + _payload)