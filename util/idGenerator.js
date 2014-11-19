/**
 * Created by mavy on 11/19/2014.
 */

var uuid = require('uuid');

module.exports = {
    get: function () {
        return uuid.v4();
    }
};