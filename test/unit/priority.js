/* jshint expr:true */
/* global describe, it, before, beforeEach */
'use strict';

var expect = require('chai').expect;
var Priority = require('../../app/models/priority');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');

var p1;

describe('Priority', function(){
  before(function(done){
    dbConnect('priority-test', function(){
      done();
    });
  });

  beforeEach(function(done){
    Priority.collection.remove(function(){
      var o = {name:'low', color:'blue', number:'1'};
      p1=new Priority(o);
      p1.insert(function(){
        done();
        });
     });
   });

  describe('constructor', function(){
    it('should create a new Priority object', function(){
      var medium = new Priority({name:'medium', color:'red', value:'5'});

      expect(medium).to.be.instanceof(Priority);
      expect(medium.name).to.equal('medium');
      expect(medium.value).to.equal('5');
      expect(medium.color).to.equal('red');
    });
  });

  describe('#insert', function(){
    it('should insert a priority', function(done){
      var o ={name:'medium', color:'red', number:'5'};
      var medium = new Priority(o);
      medium.insert(function(){
        expect(medium._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.all', function(){
    it('should get all priorities from database', function(done){
      Priority.all(function(priorities){
        expect(priorities).to.have.length(1);
        expect(priorities[0]).to.be.instanceof(Priority);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a priority by its id', function(done){
      Priority.findById(p1._id.toString(), function(priority){
        expect(priority.name).to.equal('low');
        expect(priority).to.be.instanceof(Priority);
        done();
      });
    });
  });
});

