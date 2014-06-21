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
  try {
    msg = JSON.parse(msg);
  } catch(e) {
    return console.error('failed to parse json message: ', e);
  }

  switch(msg.action) {
    case 'acknowledged':
      lib.startSendingTemps(rinfo);
      break;
  }

  console.log('server got: ' + msg.action + ' from ' +
    rinfo.address + ':' + rinfo.port);
});

server.on('listening', function() {
  var address = server.address();
  console.log('server listening ' +
    address.address + ':' + address.port);
  
  lib.findClient();
});

server.bind(4000);
