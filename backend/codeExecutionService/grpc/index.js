const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = 'proto/app.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const ProblemManageService =
    grpc.loadPackageDefinition(packageDefinition).ProblemManageService;

const RPC_PORT = process.env.GRPC_PORT;
const ServiceHost = process.env.GRPC_HOST;

const client = new ProblemManageService(
    ServiceHost + ':' +RPC_PORT,
    grpc.credentials.createInsecure(),
);

console.log('Create RCP User Client: ' + ServiceHost+':'+RPC_PORT);

module.exports = client;

