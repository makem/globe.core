/**
 * Created by mavy on 11/19/2014.
 */

var Message = require('../../messages').Message;
var MessageFormatError = require('../../messages/errors').MessageFormatError;

var chai = require('chai');
chai.should();
var idGenerator = require('../../util/idGenerator');

describe('Messages', function () {
    var ownerId = idGenerator.get();
    var body = {
        key: 'value'
    };
    var message = new Message(ownerId, body);
    describe('all', function () {
        describe('should have a header', function () {
            var header = message.getHeader();
            it('that is just an object', function () {
                header.should.be.an('object');
            });
            it('that has id property', function () {
                header.should.have.property('id');
                header.should.have.property('ownerId');
                header.ownerId.should.be.equal(ownerId);
                header.should.have.property('createdWhen');
            });
            it('that has ownerId property', function () {
                header.should.have.property('ownerId');
                header.ownerId.should.be.equal(ownerId);
            });
            it('that has createdWhen property', function () {
                header.should.have.property('createdWhen');
                header.createdWhen.should.be.instanceOf(Date);
            });
        });
        describe('should have body', function () {
            var body = message.getBody();
            it('that is an object', function () {
                body.should.be.an('object');
            });
            it('that is cannot be assigned if is not an object',function(){
                chai.expect(function(){
                    new Message(ownerId, 123);
                }).to.throw(MessageFormatError);
            });
            it('that is cannot be assigned if is null or undefined',function(){
                chai.expect(function(){
                    new Message(ownerId, null);
                }).to.throw(MessageFormatError);
                chai.expect(function(){
                    new Message(ownerId);
                }).to.throw(MessageFormatError);

            });
        });
    });
});
