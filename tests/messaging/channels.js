/**
 * Created by mavy on 11/19/2014.
 */

var idGenerator = require('../../utils/idGenerator');
var chai = require('chai');
chai.should();

describe('Channels', function () {
    describe('pipe channel', function () {
        describe('lifecycle', function () {
            it('should be closed just after instantiation');
            it('becomes opened after opening a connection');
            it('should be paused after the connection gets lost');
            it('becomes opened again after the connection refused');
        });
        describe('propagation', function () {

        });

    })
});