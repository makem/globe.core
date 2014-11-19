/**
 * Created by mavy on 11/19/2014.
 */

function ApplicationError(code, message, subject) {
    this._code = code;
    this._message = message;
    this._subject = subject;
}

ApplicationError.prototype.getCode =function(){
  return this._code;
};

ApplicationError.prototype.getMessage =function(){
    return this._message;
};

ApplicationError.prototype.getSubject =function(){
    return this._subject;
};


exports.ApplicationError = ApplicationError;