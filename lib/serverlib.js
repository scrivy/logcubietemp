'use strict';

var socket;

var self = module.exports = {
  init: function(sockettocache) {
    socket = sockettocache;
  },
  connectToClient: function() {
    socket.setBroadcast(true);


  }
}
