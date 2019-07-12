let grpc            = require('grpc');
let protoLoader     = require('@grpc/proto-loader');
const protoPath     = __dirname + '/testpackage.testservice.proto';
const protoDefine   = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const proto         = grpc.loadPackageDefinition(protoDefine)
const package       = proto.testpackage

function ping (data, callback) {
    console.log('收到rpc请求，入参为：' + data)
    callback(null, {
        data: 'this is rpc response'
    })
}

let server = new grpc.Server()
server.addService(package.testservice.service, {ping: ping});
server.bind('0.0.0.0:5005', grpc.ServerCredentials.createInsecure());
server.start();