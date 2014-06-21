'use strict';

var dgram = require('dgram')
  , lib = require('./lib/serverlib');


var server = dgram.createSocket('udp4');
lib.init(server);

server.on('error', function(err) {
  console.log('server error:\n' + err.stack);
  server.close();
});

server.on('message', function(msg, rinfo) {
  console.log('server got: ' + msg + ' from ' +
    rinfo.address + ':' + rinfo.port);
});

server.on('listening', function() {
  var address = server.address();
  console.log('server listening ' +
    address.address + ':' + address.port);
  
  lib.connectToClient();
});

server.bind(4000);
