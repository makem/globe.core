/**
 * Created by Maxim Vyhovskyi on 11/20/2014.
 */

var PriorityFormatError = require('./errors').PriorityFormatError;

function priorityDigitIsWrong(digit) {
    return !(digit >= 0 && digit < 3);
}
function Priority(value) {
    this._delivery = 1;
    this._handling = 1;
    this._feedback = 1;

    if (typeof(value) == 'string') {
        value = parseInt(value);
    }
    var incorrectFormat = false;
    if (typeof(value) == 'number') {
        if (value || value >= 0) {
            var digit = (value / 100).toFixed(0);
            incorrectFormat = priorityDigitIsWrong(digit);
            this._delivery = digit;
            digit = ((value - digit * 100) / 10).toFixed(0);
            if (!incorrectFormat) {
                incorrectFormat = priorityDigitIsWrong(digit);
            }
            this._handling = digit;
            this._feedback = value - this._delivery * 100 - this._handling * 10;
            if (!incorrectFormat) {
                incorrectFormat = priorityDigitIsWrong(this._feedback);
            }
        }else{
            incorrectFormat = true;
        }
    }
    if(incorrectFormat){
        throw new PriorityFormatError('PR001', 'Message priority has incorrect format parameter', value);
    }
}

Priority.prototype.toString = function () {
    return this._delivery + '' + this._handling + '' + this._feedback;
};

Priority.getDigitLetter = function(digit){
    switch(digit){
        case 0: return 'H';
        case 1: return 'M';
    }
    return 'L';
};

Priority.prototype.getDeliveryPriority = function(){
  return this._delivery;
};

Priority.prototype.getDeliveryPriorityLetter = function(){
    return Priority.getDigitLetter(this._delivery);
};

Priority.prototype.setDeliveryPriority = function(digit){
    if(priorityDigitIsWrong(digit)){
        throw new PriorityFormatError('PR002','Priority part digit is wrong',digit);
    }
    this._delivery = digit;
};

Priority.prototype.getHandlingPriority = function(){
    return this._handling;
};

Priority.prototype.getHandlingPriorityLetter = function(){
    return Priority.getDigitLetter(this._handling);
};

Priority.prototype.setHandlingPriority = function(digit){
    if(priorityDigitIsWrong(digit)){
        throw new PriorityFormatError('PR002','Priority part digit is wrong',digit);
    }
    this._handling = digit;
};

Priority.prototype.getFeedbackPriority = function(){
    return this._feedback;
};

Priority.prototype.getFeedbackPriorityLetter = function(){
    return Priority.getDigitLetter(this._feedback);
};

Priority.prototype.setFeedbackPriority = function(digit){
    if(priorityDigitIsWrong(digit)){
        throw new PriorityFormatError('PR002','Priority part digit is wrong',digit);
    }
    this._feedback = digit;
};


module.exports = Priority;