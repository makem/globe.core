/**
 * Created by mavy on 11/19/2014.
 */

var util = require('util');
var ApplicationError = require('../errors').ApplicationError;

function MessageFormatError(code, message, subject) {
    ApplicationError.call(this,code, message, subject);
}

util.inherits(MessageFormatError, ApplicationError);

exports.MessageFormatError = MessageFormatError;