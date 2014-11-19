/**
 * Created by mavy on 11/19/2014.
 */

var MessageBusError = require('./errors').MessageBusError;

/**
 * Message Bus
 *
 * @constructor
 */
exports.MessageBus = function MessageBus() {
    var self = this;
    var threshold = 1000;
    var queue = [];
    /**
     *
     * @param message
     * @returns {boolean}
     */
    this.send = function (message) {
        if (queue.length + 1 > threshold) {
            return false;
        }
        if(self.messageIsCorrect(message)) {
            queue.push(message);
            return true;
        }
        throw new MessageBusError('MB001','Message has incorrect format', message);
    };
    /**
     * Tries to set threshold level given
     * The parameter passed should be a number and more than zero
     * @param level
     */
    this.setThreshold = function (level) {
        if (typeof(level) == 'number') {
            if (level > 0) {
                threshold = level;
            }
        }
    };
    /**
     * Gets current threshold value
     * @returns {number}
     */
    this.getThreshold = function () {
        return threshold;
    };

    this.messageIsCorrect = function(message){
        //Message should exists and have header and body sections
        if(message){
            var header = message.getHeader();
            if(header && header.id && header.ownerId && header.createdWhen){
                var body = message.getBody();
                if(body){
                    return true;
                }
            }
        }
        return false;
    };
};