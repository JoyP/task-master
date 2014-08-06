/* jshint expr:true */
/* global describe, it, before, beforeEach */
'use strict';

var expect = require('chai').expect;
var Priority = require('../../app/models/priority');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');


describe('Priority', function(){
  before(function(done){
    dbConnect('priority-test', function(){
      done();
    });
  });

  beforeEach(function(done){
    Priority.collection.remove(function(){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Priority object', function(){
      var medium = new Priority({name:'medium', color:'red', number:'5'});

      expect(medium).to.be.instanceof(Priority);
      expect(medium.name).to.equal('medium');
      expect(medium.number).to.equal('5');
      expect(medium.color).to.equal('red');
    });
  });
});

