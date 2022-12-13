const express = require("express");
const user_route = express();


const user_controller = require('../controllers/userController');


const validation = require('../helpers/validate_schema');
const {validate} = require('../middlerware/validationMiddleware');

const bodyParser = require("body-parser");

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

const auth = require('../middlerware/auth');
const verifyToken = require("../middlerware/auth");

user_route.post('/register', validate(validation.authSchema) ,user_controller.register_user);
user_route.post('/login',  user_controller.user_login);

user_route.get('/test',auth , function(req, res){
    
    res.status(200).send({success: true, mssg:"Authenticated...."})
});



module.exports = user_route;