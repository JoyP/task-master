/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Task = require('../../app/models/task');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');

var t1;

describe('Task', function(){
  before(function(done){
    dbConnect('task-test', function(){
      done();
    });
  });

  beforeEach(function(done){
   Task.collection.remove(function(){
      var o = {name:'Laundry', dueDate:'08/08/2014', photo:'http://en.wikipedia.org', type:'household', priority:'high'};
      t1=new Task(o);
      t1.insert(function(){
        done();
        });
     });
   });

  describe('constructor', function(){
    it('should create a new Task object', function(){
      var o = {name:'Groceries', dueDate:'08/08/2014', photo:'http://en.wikipedia.org', type:'household', priority:'high'};
      t1=new Task(o);

      expect(t1).to.be.instanceof(Task);
      expect(t1.name).to.equal('Groceries');
      expect(t1.dueDate).to.equal('08/08/2014');
      expect(t1.photo).to.equal('http://en.wikipedia.org');
      expect(t1.type).to.equal('household');
      expect(t1.priority).to.equal('high');
    });
  });

  describe('#insert', function(){
    it('should insert a task', function(done){
      var o = {name:'Laundry', dueDate:'08/08/2014', photo:'http://en.wikipedia.org', type:'household', priority:'high'};
      var t2 = new Task(o);
      t2.insert(function(){
        expect(t2._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.all', function(){
    it('should get all tasks from database', function(done){
      Task.all(function(tasks){
        expect(tasks).to.have.length(1);
        expect(tasks[0]).to.be.instanceof(Task);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a task by its id', function(done){
      Task.findById(t1._id.toString(), function(task){
        expect(t1.priority).to.equal('high');
        expect(t1).to.be.instanceof(Task);
        done();
      });
    });
  });
});
