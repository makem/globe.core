/**
 * Created by mavy on 11/18/2014.
 */
var idGenerator = require('../../util/idGenerator');
var chai = require('chai');
chai.should();

describe('Message bus', function () {
    var MessageBus = require('../../messages/bus').MessageBus;
    var BroadcastMessage = require('../../messages/broadcast');
    var MessageBusError = require('../../messages/bus/errors').MessageBusError;
    var bus;
    beforeEach(function () {
        bus = new MessageBus();
    });
    function createBroadcastMockMessage() {
        var ownerId = idGenerator.get();
        var message = new BroadcastMessage(ownerId, 'TestMessageName',{
            key:'value'
        });
        return message;
    }

    describe('threshold level', function () {
        it('should allow to get current level', function () {
            // Given a just created bus
            // When asking default threshold value
            // Then it should return 1000
            var defaultThreshold = bus.getThreshold();
            defaultThreshold.should.be.equal(1000);
        });
        it('should allow to change level', function () {
            // Given a just created bus
            // When set threshold value
            bus.setThreshold(100);
            // Then it should allow to change the value
            var currentThreshold = bus.getThreshold();
            currentThreshold.should.be.equal(100);
        });
        it('should check out the setting value must be more than zero', function () {
            // Given a just created bus
            // When set threshold value with incorrect value
            bus.setThreshold(0);
            // Then it should preserve previous (default) level unchanged
            var currentThreshold = bus.getThreshold();
            currentThreshold.should.be.equal(1000);
        });
        it('should check out the type of the setting is number', function () {
            // Given a just created bus
            // When set threshold value with incorrect value
            bus.setThreshold('abc');
            // Then it should preserve previous (default) level unchanged
            var currentThreshold = bus.getThreshold();
            currentThreshold.should.be.equal(1000);
        });
        it('should check out the type of the setting is not null', function () {
            // Given a just created bus
            // When set threshold value with incorrect value
            bus.setThreshold(null);
            // Then it should preserve previous (default) level unchanged
            var currentThreshold = bus.getThreshold();
            currentThreshold.should.be.equal(1000);
        });
    });
    describe('message propagation', function () {
        it('should send a broadcast message', function () {
            // Given a message bus and a message
            var message = createBroadcastMockMessage();
            // When someone sends a broadcast message on the bus
            var status = bus.send(message);
            // Then it returns the propagation status
            status.should.be.equal(true);
        });
        it('should check incoming message is correct', function () {
            // Given a message bus and a message
            var message = createBroadcastMockMessage();
            // When trying to send a message it's better to check out it has a correct format
            var result = bus.messageIsCorrect(message);
            result.should.be.equal(true);
        });
        it('should throw an exception if incoming message is not match the requirements', function () {
            // Given a message bus and a message
            var message = createBroadcastMockMessage();
            // When trying to send a message without some necessary data
            delete(message._id);
            // Then it should throw MessageBusError
            chai.expect(function(){
                bus.send(message);
            }).to.throw(MessageBusError);
        });
        it('should confirm any message before or equal threshold overflow', function () {
            // Given a message bus and a message
            // Also a message bus threshold level is set to 5
            var message = createBroadcastMockMessage();
            bus.setThreshold(3);
            // When someone sends a broadcast message to the bus after threshold been approached
            bus.send(message);
            bus.send(message);
            var status = bus.send(message);
            // Then last status must be failed
            status.should.be.equal(true);
        });
        it('should refuse any message being overflow threshold', function () {
            // Given a message bus and a message
            // Also a message bus threshold level is set to 5
            var message = createBroadcastMockMessage();
            bus.setThreshold(3);
            // When someone sends a broadcast message to the bus after threshold been approached
            bus.send(message);
            bus.send(message);
            bus.send(message);
            var status = bus.send(message);
            // Then last status must be failed
            status.should.be.equal(false);
        });
    });
    describe('communication', function () {
        it('should inform about answer received');
        it('should propagate a message if no recipients found locally');
    });
});