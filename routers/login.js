var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var models  = require('../models');
var passwordHash = require('password-hash');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/doLogin",async function(req, res, next){//Rota para realizar Login usuario
	 var senha = req.body.senha;
	 var email = req.body.email;
	 var hashPassword = passwordHash.generate(senha);
	 var user = await models.User.findOne({
		where:{
			email: email
		}
	 });
	 if(user && passwordHash.verify(senha,user.get('senha'))){
		res.json({"aproved":true, "id":user.get('id'), "nome":user.get('nome'),sexo:user.get('sexo'),"idade":user.get("nascimento"), "departamento": user.get("departamento")});
		res.end();
	 }else{
		res.json({"aproved":false, "msg":"E-mail ou senha inválidos"});
	 }
});

module.exports = router;
