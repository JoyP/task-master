'use strict';

var Mongo = require('mongodb');
var _     = require('lodash');

function Priority(o){
  this.name   = o.name;
  this.number = o.number;
  this.color  = o.color;
}

Object.defineProperty(Priority, 'collection', {
  get: function(){return global.mongodb.collection('priorities');}
});

//Object.defineProperty(Priority.prototype, 'color', {
//  get: function(){return global.mongodb.collection('color');}
//});

Priority.prototype.insert = function(cb){
  Priority.collection.save(this, cb);
};

Priority.all = function(cb){
  Priority.collection.find().toArray(function(err, objects){
    var priority = objects.map(function(o){
      return changePrototype(o);
    });

    cb(priority);
  });
};

Priority.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Priority.collection.findOne({_id:_id}, function(err, obj){
    var priority = changePrototype(obj);

    cb(priority);
  });
};


module.exports = Priority;

// PRIVATE FUNCTIONS ///

function changePrototype(obj){
  return _.create(Priority.prototype, obj);
}
