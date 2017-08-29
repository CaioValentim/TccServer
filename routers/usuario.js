var express = require('express');
var router = express.Router();
var cors = require('cors');
var bodyParser = require('body-parser');
var models  = require('../models');
var passwordHash = require('password-hash');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));





router.post("/createAccount",cors(), async function(req, res, next){//Rota para cadastrar usuário
	 var nome = req.body.nome;
	 var email = req.body.email;
	 var senha = req.body.senha;
	 var sexo = req.body.sexo;
	 var nascimento = req.body.nascimento;
	 var departamento = req.body.departamento;
	 
	 var user = await models.User.findOne({
		where:{
			email: email
		}
	 });
	if (user){
		res.json({"aproved":false,"msg":"E-mail já cadastrado, favor usar outro email"});
		res.end();
	}else{
		var hashPassword = passwordHash.generate(senha);
		models.User.create({
			nome: nome,
			senha : hashPassword,
			email: email,
			sexo: sexo,
			nascimento:nascimento,
			departamento: departamento
		}).then(function(response) {
			res.json({"aproved":true});
			res.end();
		});
	}
});



module.exports = router;