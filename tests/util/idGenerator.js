/**
 * Created by mavy on 11/19/2014.
 */

var generator = require('../../util/idGenerator');
var chai = require('chai');
chai.should();

describe('Id generator', function () {
    it('should return a value', function () {
        var id = generator.get();
        id.should.be.not.empty;
    });
    it('should return unique values', function () {
        var instancesCount = 1000;
        var ids = [];
        for (var i = 0; i < instancesCount; i++) {
            ids.push(generator.get());
        }
        ids.should.be.length(instancesCount);
        for (i = 0; i < instancesCount; i++) {
            var currentId = ids[i];
            var excluded = ids.filter(function(id){
               return id != currentId;
            });
            excluded.should.not.include(currentId);
        }
    });

});