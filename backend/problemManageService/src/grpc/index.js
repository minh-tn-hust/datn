const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const testcaseService = require('./testcase/testcase');
const PROTO_PATH = 'src/proto/app.proto';
require('dotenv').config()


const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const Proto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

const start = async (port) => {
  await server.addService(Proto.ProblemManageService.service, {
    getTestCase : testcaseService.getTestcaseWithProblem
  });

  await server.bindAsync(
      `${process.env.GRPC_HOST}:${port}`,
      grpc.ServerCredentials.createInsecure(),
      (err, port) => {
        if (err) {
          console.log(err);
        }
        console.log('Server RPC running at port %d', port);
        server.start();
      },
  );
};

module.exports = {
  start
};

