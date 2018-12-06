var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'world'
})



app.post('/employee/add', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  connection.query('INSERT INTO employee (name, phone) VALUES (?, ?)', [req.body.name, req.body.phone], function(err, result) {
        if (err){
           res.send(err); 
           return;
        } 
          res.send({ message: 'Employee Successfully saved!!' })
        })
});

app.delete('/employee/delete', function(req, res){
  res.setHeader('Content-Type', 'application/json');
    connection.query('Delete from employee where name = ?',[req.body.name], function(err, result){
          if(err){
            res.send(err);
            return;
          }
          res.send({ message: 'Employee Successfully delete!!' })
       })
});

app.put('/employee/update', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  if(req.body.name ||  req.body.phone){
    connection.query('Update employee set name = ?, phone = ? where name = ? ',[req.body.name, req.body.phone,req.body.name], function(err, result){
      if(err){
        res.send(err);
        return;
      }
      res.send({ message: 'Employee Successfully Updated!!' });
     })
     return;
  }
  res.send({ message: 'Mention both name & phone'})
});

app.get('/employee/getAll', function(req, res){
  res.setHeader('Content-Type', 'application/json');
     connection.query('Select * from employee ',[], function(err, result){
        if(err){
          res.send(err);
          return;
        }        
        res.send(result)
     })
 });

module.exports = app;
