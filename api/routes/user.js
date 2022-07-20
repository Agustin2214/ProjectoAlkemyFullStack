const {Router} = require('express');
const { userGet, userPost, userGetAtm, userGetAtmTotal } = require('../controllers/user');
const { check } = require('express-validator');
const router = Router();


router.get("/",userGet)
router.post('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').isLength({min:6,
    max:20}),
    check('email','ingrese un email correcto').isEmail()
],userPost)
router.get("/allatmuser",userGetAtm)
router.get("/total",userGetAtmTotal)


module.exports = router;