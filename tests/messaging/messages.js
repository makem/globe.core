/**
 * Created by mavy on 11/19/2014.
 */

var Message = require('../../messages').Message;
var MessageFormatError = require('../../messages/errors').MessageFormatError;
var Priority = require('../../messages').Priority;

var chai = require('chai');
chai.should();
var idGenerator = require('../../utils/idGenerator');

describe('Messages', function () {
    var ownerId = idGenerator.get();
    var body = {
        key: 'value'
    };
    var name = 'SSO.Integration.GetPassport';
    var message = new Message(ownerId, name, body);
    describe('all instances', function () {
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
            it('that has name property', function () {
                header.should.have.property('name');
                header.name.should.be.a('string');
            });
            it('that has priority property', function () {
                header.should.have.property('priority');
                header.priority.should.be.instanceOf(Priority);
            });
            it('that is of 111 priority by default', function () {
                header.priority.toString().should.be.equal('111');
                header.priority.getDeliveryPriorityLetter().should.be.equal('M');
                header.priority.getHandlingPriorityLetter().should.be.equal('M');
                header.priority.getFeedbackPriorityLetter().should.be.equal('M');
            });
        });
        describe('should have body', function () {
            var body = message.getBody();
            it('that is an object', function () {
                body.should.be.an('object');
            });
            it('that is cannot be assigned if is not an object', function () {
                chai.expect(function () {
                    new Message(ownerId, 123);
                }).to.throw(MessageFormatError);
            });
            it('that is cannot be assigned if is null or undefined', function () {
                chai.expect(function () {
                    new Message(ownerId, null);
                }).to.throw(MessageFormatError);
                chai.expect(function () {
                    new Message(ownerId);
                }).to.throw(MessageFormatError);

            });
        });
        describe('should allow to change',function(){
           describe('priority',function(){
               it('using a new Priority instance', function(){
                   message.setPriority(new Priority(121));
                   message.getHeader().priority.toString().should.be.equal('121');
                   message.setPriority(new Priority('201'));
                   message.getHeader().priority.toString().should.be.equal('201');

               });
           })
        });
    });
});
