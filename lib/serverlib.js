'use strict';

var fs = require('fs');

var socket
  , findInterval
  , sendTempsInterval
  , client;

var self = module.exports = {
  init: function(sockettocache) {
    socket = sockettocache;
  },

  findClient: function() {
    socket.setBroadcast(true);

    var message = new Buffer(JSON.stringify({
      action: 'broadcast'
    }));
    findInterval = setInterval(function() {
      socket.send(message, 0, message.length, 4000, '255.255.255.255');
    }, 500);
  },

  startSendingTemps: function(rinfo) {
    clearInterval(findInterval);
    clearInterval(sendTempsInterval);

    client = {
      ip: rinfo.address,
      port: rinfo.port
    }

    sendTempsInterval = setInterval(function() {
//      fs.readFile('/sys/devices/platform/sunxi-i2c.0/i2c-0/0-0034/temp1_input', function(err, temp) {
      fs.readFile('/sys/devices/virtual/thermal/thermal_zone0/temp', function(err, temp) {
        if (err) return console.error('error getting temp: ', err);

        var message = new Buffer(JSON.stringify({
          action: 'temp',
          data: {
            temp: temp.toString(),
            date: Date.now()
          }
        }));

        socket.send(message, 0, message.length, client.port, client.ip);
      });
    }, 500);
  }
}
