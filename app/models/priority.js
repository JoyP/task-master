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

module.exports = Priority;
