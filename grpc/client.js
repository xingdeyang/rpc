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

const client = new package.testservice('0.0.0.0:5005', grpc.credentials.createInsecure())
client.ping({id: '123'}, function (err, response) {
    console.log(response)
})