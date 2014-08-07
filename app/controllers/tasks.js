'use strict';

var Task = require('../models/task');
var Priority = require('../models/priority');

exports.init = function(req, res){
  Priority.all(function(priorities){
  res.render('tasks/init', {priorities:priorities});
  });
};

exports.create = function(req, res){
  var task = new Task(req.body);
  task.insert(function(){
    res.redirect('/tasks');
  });
};

exports.index = function(req, res){
  Task.all(function(tasks){
    Priority.all(function(priorities){
     res.render('tasks/index', {tasks:tasks, priorities:priorities});
  });
  });
};

exports.show = function(req, res){
  Task.findById(req.params.id, function(task){
    res.render('tasks/show', {task:task});
  });
};

