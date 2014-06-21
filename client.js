'use strict';

var dgram = require('dgram');


var client = dgram.createSocket('udp4');

client.on('error', function(err) {
  console.log('client error:\n' + err.stack);
  client.close();
});

client.on('message', function(msg, rinfo) {
  console.log('client got: ' + msg + ' from ' +
    rinfo.address + ':' + rinfo.port);
});

client.on('listening', function() {
  var address = client.address();
  console.log('client listening ' +
    address.address + ':' + address.port);
});

client.bind(4000);
