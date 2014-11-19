/**
 * Created by mavy on 11/19/2014.
 */
var idGenerator = require('../util/idGenerator');
var MessageFormatError = require('./errors').MessageFormatError;
/**
 *
 * @param ownerId
 * @param name
 * @param body
 * @constructor
 */
function Message(ownerId, name, body) {
    this._id = idGenerator.get();
    if(!name || typeof(name)!='string'){
        throw new MessageFormatError('MS001','Message name should be a non-empty string', name);
    }
    this._name = name;
    this._oid = ownerId;
    this._crw = new Date();
    if(!body || typeof(body) != 'object'){
        throw new MessageFormatError('MS002','Message body should be an object', body);
    }
    this._body = body;
}

/**
 *
 * @returns {{id: *, ownerId: *, createdWhen: (Date|*)}}
 */
Message.prototype.getHeader = function () {
    return {
        id: this._id,
        name: this._name,
        ownerId: this._oid,
        createdWhen: this._crw
    }
};

Message.prototype.getBody = function () {
    return this._body;
};

exports.Message = Message;
