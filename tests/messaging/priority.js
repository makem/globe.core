/**
 * Created by Maxim Vyhovskyi on 11/20/2014.
 */


var Priority = require('../../messages').Priority;

var chai = require('chai');
chai.should();


describe('Message Priority', function () {
    var priority = new Priority();
    describe('might be created', function () {
        it('without parameters by default 111', function () {
            priority.toString().should.be.equal('111');
        });
        it('with one-digit number parameter like 1', function () {
            var priority = new Priority(0);
            priority.toString().should.be.equal('000');
            priority = new Priority(1);
            priority.toString().should.be.equal('001');
            priority = new Priority(2);
            priority.toString().should.be.equal('002');
        });
        it('with two-digit number parameter like 11', function () {
            var priority = new Priority(00);
            priority.toString().should.be.equal('000');
            priority = new Priority(11);
            priority.toString().should.be.equal('011');
            priority = new Priority(12);
            priority.toString().should.be.equal('012');
        });
        it('with three-digit number parameter like 222', function () {
            var priority = new Priority(000);
            priority.toString().should.be.equal('000');
            priority = new Priority(111);
            priority.toString().should.be.equal('111');
            priority = new Priority(222);
            priority.toString().should.be.equal('222');
        });
        it('with three-digit string parameter like "222"', function () {
            var priority = new Priority('000');
            priority.toString().should.be.equal('000');
            priority = new Priority('111');
            priority.toString().should.be.equal('111');
            priority = new Priority('222');
            priority.toString().should.be.equal('222');
        });
        it('with three-digit parameter like 012', function () {
            var priority = new Priority('012');
            priority.toString().should.be.equal('012');
            priority = new Priority('002');
            priority.toString().should.be.equal('002');
            priority = new Priority('201');
            priority.toString().should.be.equal('201');
            priority = new Priority('110');
            priority.toString().should.be.equal('110');
        });
    });
    describe('cannot be created', function () {
        it('with wrong digital value', function () {
            chai.expect(function () {
                new Priority(123);
            }).to.throw();
            chai.expect(function () {
                new Priority(1112);
            }).to.throw();
            chai.expect(function () {
                new Priority(3);
            }).to.throw();
            chai.expect(function () {
                new Priority(00 - 1);
            }).to.throw();
            it('with wrong float value', function () {
                chai.expect(function () {
                    new Priority(122.44);
                }).to.throw();
            });
            it('with wrong string value', function () {
                chai.expect(function () {
                    new Priority('2332');
                }).to.throw();
            });
            it('with any other value', function () {
                chai.expect(function () {
                    new Priority(new Date());
                }).to.throw();
            });
        });
    });
    describe('in common', function () {
        it('should be presented as a three-letter string', function () {
            priority.toString().should.be.equal('111');
        });
        it('should allow to get priority parts', function () {
            priority.getDeliveryPriority().should.be.equal(1);
            priority.getHandlingPriority().should.be.equal(1);
            priority.getFeedbackPriority().should.be.equal(1);
        });
        it('should allow to change priority part separately', function () {
            priority.setDeliveryPriority(2);
            // wrong parameter
            chai.expect(function () {
                priority.setDeliveryPriority(3);
            }).to.throw();
            chai.expect(function () {
                priority.setDeliveryPriority(new Date());
            }).to.throw();
        });
        it('should describe priority in symbols', function () {
            Priority.getDigitLetter(0).should.equal('H');
            Priority.getDigitLetter(1).should.equal('M');
            Priority.getDigitLetter(2).should.equal('L');
        });
    });
    describe('delivery part', function () {
        it('should be a digit in range 0-2 on the first position',function(){
            var deliveryPriority = priority.getDeliveryPriority();
            deliveryPriority.should.be.a('number');
            deliveryPriority.should.be.not.greaterThan(2);
            deliveryPriority.should.be.not.lessThan(0);
        });
        it('should be translated to symbol',function(){
            priority.getDeliveryPriorityLetter().should.be.equal('L');
        });
        it('should allow to change it without affecting other parts',function(){
            var priority = new Priority();
            priority.setDeliveryPriority(0);
            priority.getDeliveryPriority().should.be.equal(0);
            priority.getHandlingPriority().should.be.equal(1);
            priority.getFeedbackPriority().should.be.equal(1);
        });
    });
    describe('handling part', function () {
        it('should be a digit in range 0-2 on the second position',function(){
            var handlingPriority = priority.getHandlingPriority();
            handlingPriority.should.be.a('number');
            handlingPriority.should.be.not.greaterThan(2);
            handlingPriority.should.be.not.lessThan(0);
        });
        it('should be translated to symbol',function(){
            priority.getHandlingPriorityLetter().should.be.equal('M');
        });
        it('should allow to change it without affecting other parts',function(){
            var priority = new Priority();
            priority.setHandlingPriority(0);
            priority.getDeliveryPriority().should.be.equal(1);
            priority.getHandlingPriority().should.be.equal(0);
            priority.getFeedbackPriority().should.be.equal(1);
        });
    });
    describe('feedback part', function () {
        it('should be a digit in range 0-2 on the third position',function(){
            var feedbackPriority = priority.getFeedbackPriority();
            feedbackPriority.should.be.a('number');
            feedbackPriority.should.be.not.greaterThan(2);
            feedbackPriority.should.be.not.lessThan(0);

        });
        it('should be translated to symbol',function(){
            priority.getFeedbackPriorityLetter().should.be.equal('M');
        });
        it('should allow to change it without affecting other parts',function(){
            var priority = new Priority();
            priority.setFeedbackPriority(0);
            priority.getDeliveryPriority().should.be.equal(1);
            priority.getHandlingPriority().should.be.equal(1);
            priority.getFeedbackPriority().should.be.equal(0);

        });
    });
});