var express = require('express');
var app = express();
var path = require("path");
var models = require("./models");
var cors = require('cors');
var usersRouters = require("./routers/usuario");
var loginRouters = require("./routers/login");
var passport = require('passport')
app.use(passport.initialize());
app.use(function allowCrossOrigin(req, res, next){
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,HEADERS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
            res.send(200);
        }
        else {
            next();
        }
    });
app.use(passport.initialize());
app.use(usersRouters);
app.use(loginRouters);


models.sequelize.sync().then(function(){
  app.listen(8080,function(){
  	console.log("Executando.");
  });
});
