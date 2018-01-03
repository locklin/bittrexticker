var msgpack  = require("msgpack5");
var bittrex = require("node.bittrex.api");
var zmq = require('zmq')
  , sock = zmq.socket('pub');

sock.bindSync('tcp://127.0.0.1:6666');
console.log('Publisher bound to port 6666');

console.log('connecting to bittrexx');

console.log('Connecting ....');
bittrex.websockets.subscribe(['BTC-BAT','ETH-BAT'], function(data, client) {
  if (data.M === 'updateExchangeState') {
    data.A.forEach(function(data_for) {
        console.log('Market Update for '+ data_for.MarketName, data_for);
        sock.send([data_for.MarketName,data_for]);
        // do msgpack this way next
        //         sock.send(msgpack.encode(data_for));
    });
  }
});


