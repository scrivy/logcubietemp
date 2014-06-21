'use strict';

var socket
  , connectInterval;

var self = module.exports = {
  init: function(sockettocache) {
    socket = sockettocache;
  },
  connectToClient: function() {
    socket.setBroadcast(true);

    var message = new Buffer(JSON.stringify({
      action: 'broadcast'
    }));
    connectInterval = setInterval(function() {
      socket.send(message, 0, message.length, 4000, '255.255.255.255');
    }, 500);
  }
}
