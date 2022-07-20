const {Router} = require('express');
const { check } = require('express-validator');
const { authUserPost } = require('../controllers/auth');



const router = Router();


router.post("/",[
check('password','Password is required').not().isEmpty(),
check('email','Invalid email, please enter again').isEmail()] ,authUserPost)

module.exports = router 