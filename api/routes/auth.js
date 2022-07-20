const {Router} = require('express');
const { check } = require('express-validator');
const { authUserPost } = require('../controllers/auth');



const router = Router();


router.post("/",[
check('password','El password es obligatorio').not().isEmpty(),
check('email','Ingrese un email correcto').isEmail()] ,authUserPost)

module.exports = router 