const grpc = {};
grpc.web = require('grpc-web');

const { CreateUserRequest, CreateUserResponse } = require('./contract/contract_pb');
const { UserClient } = require('./contract/contract_grpc_web_pb');


export function CreateUser(username, password, callback) {
    let index = new UserClient("/grpcweb", null, null);
    let req = new CreateUserRequest();
    req.setUsername(username);
    req.setPassword(password);
    index.createUser(req, {}, callback);

}
