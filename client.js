'use strict';

var dgram = require('dgram')
  , lib = require('./lib/clientlib');

var client = dgram.createSocket('udp4');
lib.init(client);

client.on('error', function(err) {
  console.log('client error:\n' + err.stack);
  client.close();
});

client.on('message', function(msg, rinfo) {
  try {
    msg = JSON.parse(msg);
  } catch(e) {
    return console.error('failed to parse json message: ', e);
  }

  switch(msg.action) {
    case 'broadcast':
      lib.acknowledgeBroadcast(rinfo);
      break;
    case 'temp':
      lib.saveTemp(msg.data);
      console.log('current temp: ', msg.data.temp);
      break;
  }

  console.log('client got: ' + msg.action + ' from ' +
    rinfo.address + ':' + rinfo.port);
});

client.on('listening', function() {
  var address = client.address();
  console.log('client listening ' +
    address.address + ':' + address.port);
});

client.bind(4000);
