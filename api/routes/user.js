const {Router} = require('express');
const { userGet, userPost, userGetAtm, userGetAtmTotal } = require('../controllers/user');
const { check } = require('express-validator');
const router = Router();


router.get("/",userGet)
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('password','Password is required').isLength({min:6,
    max:20}),
    check('email','Invalid email, please enter again').isEmail()
],userPost)
router.get("/allatmuser",userGetAtm)
router.get("/total",userGetAtmTotal)


module.exports = router;