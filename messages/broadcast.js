/**
 * Created by mavy on 11/19/2014.
 */

var util = require('util');
var Message = require('./messages').Message;

function BroadcastMessage(ownerId, name, body) {
    Message.call(this,ownerId, name, body);

}

util.inherits(BroadcastMessage, Message);

module.exports = BroadcastMessage;