'use strict';

var socket
  , server;

var self = module.exports = {
  init: function(sockettocache) {
    socket = sockettocache;
  },
  acknowledgeBroadcast: function(rinfo) {
    server = {
      ip: rinfo.address,
      port: rinfo.port
    }

    var message = new Buffer(JSON.stringify({
      action: 'acknowledged'
    }));

    socket.send(message, 0, message.length, server.port, server.ip);
  }
}
