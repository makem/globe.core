/**
 * Created by mavy on 11/19/2014.
 */

var util = require('util');
var ApplicationError = require('../../errors').ApplicationError;

function MessageBusError(code, message, subject) {
    ApplicationError.call(this, code, message, subject);
}

util.inherits(MessageBusError, ApplicationError);

exports.MessageBusError = MessageBusError;