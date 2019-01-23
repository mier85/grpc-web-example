/**
 * @fileoverview gRPC-Web generated client stub for grpcwebexample
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.grpcwebexample = require('./contract_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.grpcwebexample.UserClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.grpcwebexample.UserPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'binary';

  /**
   * @private @const {!proto.grpcwebexample.UserClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.grpcwebexample.UserClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.grpcwebexample.CreateUserRequest,
 *   !proto.grpcwebexample.CreateUserResponse>}
 */
const methodInfo_CreateUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.grpcwebexample.CreateUserResponse,
  /** @param {!proto.grpcwebexample.CreateUserRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.grpcwebexample.CreateUserResponse.deserializeBinary
);


/**
 * @param {!proto.grpcwebexample.CreateUserRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.grpcwebexample.CreateUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.grpcwebexample.CreateUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.grpcwebexample.UserClient.prototype.createUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/grpcwebexample.User/CreateUser',
      request,
      metadata,
      methodInfo_CreateUser,
      callback);
};


/**
 * @param {!proto.grpcwebexample.CreateUserRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.grpcwebexample.CreateUserResponse>}
 *     The XHR Node Readable Stream
 */
proto.grpcwebexample.UserPromiseClient.prototype.createUser =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.createUser(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.grpcwebexample;

