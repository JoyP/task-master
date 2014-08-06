'use strict';

var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('express-method-override');
var home = require('../controllers/home');
var tasks = require('../controllers/tasks');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', home.index);
  app.get('/about', home.about);
  app.get('/faq', home.faq);
  app.get('/contact', home.contact);

  app.get('/tasks/new', tasks.init);
  app.post('/tasks', tasks.create);
  app.get('/tasks', tasks.index);
  app.get('/tasks/:id', tasks.show);
  //app.get('/tasks/:id/task', tasks.test);
  //app.post('/tasks/:id/task', tasks.addTest);

  console.log('Pipeline Configured');
};
