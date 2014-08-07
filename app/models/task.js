'use strict';

var Mongo = require('mongodb');
var _     = require('lodash');
var moment=require('moment');

var Priority = require('../models/priority');

function Task(o){
  this.name       = o.name;
  this.dueDate    = moment(o.dueDate).format('l');
  this.photo      = o.photo;
  this.type       = o.type.split(',').map(function(s){return s.trim();});
  this.priority   = o.priority;
  this.isComplete = false;
//  this.priorityId = Mongo.ObjectID(priority._id);
}

Object.defineProperty(Task, 'collection', {
  get: function(){return global.mongodb.collection('tasks');}
});

Task.prototype.insert = function(cb){
  Task.collection.save(this, cb);
};

//Task.prototype.color = function(cb){
//  priority.findById();
//};

Task.all = function(cb){
  Task.collection.find().toArray(function(err, objects){
    var task = objects.map(function(o){
      return changePrototype(o);
    });

    cb(task);
  });
};

Task.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Task.collection.findOne({_id:_id}, function(err, obj){
    var task = changePrototype(obj);

    cb(task);
  });
};


module.exports = Task;

// PRIVATE FUNCTIONS ///

function changePrototype(obj){
  return _.create(Task.prototype, obj);
}

